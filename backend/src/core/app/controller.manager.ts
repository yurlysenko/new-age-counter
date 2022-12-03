import { container, injectable, InjectionToken } from 'tsyringe';
import { getMetadata } from '../utils/reflect/metadata';
import { IGuardMetadata, IRouteControllerMetadata, IRouteHandlerMetadata } from '../types/metadata';
import {
  GUARD_METADATA,
  ROUTE_CONTROLLER_METADATA,
  ROUTE_HANDLER_METADATA,
} from '../constants/reflect-metadata';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import path from 'path';
import { ExceptionError, isExceptionError } from '../abstract/exception-error';
import { InternalServerErrorException } from '../exceptions/InternalServerErrorException';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

@injectable()
export class ControllerManager {
  /**
   * Checks if the class contains the `@Controller` decorator,
   * and extracts the methods inside the class and registers it into an express Router object, then returns it.
   *
   * @param routeClass - A class using the `@Controller` decorator
   * @return Router - An express router mapped with route handlers.
   */
  initializeController = (routeClass: InjectionToken): Router => {
    const routeInstance = container.resolve(routeClass);

    // Get RouteClass Metadata
    const controllerMetadata = getMetadata<IRouteControllerMetadata>(
      ROUTE_CONTROLLER_METADATA,
      routeClass,
    );

    // Check if class has @Controller decorator
    if (!controllerMetadata) {
      const className = Object.getOwnPropertyDescriptors(routeClass).name.value;

      throw new Error(`${className} class needs to be decorated with "@Controller"`);
    }

    // Initialize Express Router
    const expressRouter = Router(controllerMetadata.config);

    this.registerRouteHandlers(expressRouter, routeClass, routeInstance, controllerMetadata);

    return expressRouter;
  };

  private async exceptionWrapper(
    this: RequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this(req, res, next);
    } catch (e) {
      const error = ((err: any): ExceptionError => {
        if (isExceptionError(err)) {
          return err;
        }
        console.error(err);
        return new InternalServerErrorException();
      })(e);

      res.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  private registerRouteHandlers = (
    expressRouter: Router,
    routeClass: InjectionToken,
    routeInstance: any,
    controllerMetadata: IRouteControllerMetadata,
  ): void => {
    const routePrototype = Object.getPrototypeOf(routeInstance);

    // Register all class methods as express route handlers
    const routeKeys = Reflect.ownKeys(routeInstance);
    routeKeys.forEach((key) => {
      const methodMetadata = getMetadata<IRouteHandlerMetadata>(
        ROUTE_HANDLER_METADATA,
        routePrototype,
        key,
      );

      // If method decorator is not present, skip method.
      if (!methodMetadata) return;

      const guardsMetadata = [
        getMetadata<IGuardMetadata>(GUARD_METADATA, routeClass),
        getMetadata<IGuardMetadata>(GUARD_METADATA, routePrototype, key),
      ];

      // Generate an absolute path
      const endpointPath = path
        .join('/', controllerMetadata.route, methodMetadata.route)
        .replace(/\\/g, '/');

      guardsMetadata.forEach((metadata) =>
        this.registerGuard(metadata, expressRouter, endpointPath, routePrototype, key),
      );

      // Register endpoint to express router
      const handler = this.exceptionWrapper.bind(async (req: Request, res: Response) => {
        const data = await routeInstance[key](req);

        res.setHeader('Content-Type', 'application/json');
        res.status(req.method == 'POST' ? 201 : 200).send(data ?? {});
      });

      expressRouter[methodMetadata.method](endpointPath, handler);

      console.debug(`Registered Route: {${methodMetadata.method.toUpperCase()}, ${endpointPath}}`);
    });
  };

  registerGuard = (
    guardMetadata: IGuardMetadata | undefined,
    expressRouter: Router,
    endpoint: string,
    controller: InjectionToken,
    handler: string | symbol,
  ): void => {
    if (!guardMetadata) return;

    const guardInstance = container.resolve(guardMetadata.token);

    const guardHandler = this.exceptionWrapper.bind(
      async (req: Request, _: Response, next: NextFunction) => {
        if (await guardInstance.validate(req, { controller, handler })) {
          return next();
        }

        throw new UnauthorizedException();
      },
    );

    expressRouter.use(endpoint, guardHandler);
  };
}
