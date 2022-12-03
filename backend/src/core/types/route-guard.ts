import { Request } from 'express';
import { InjectionToken } from 'tsyringe';

export interface IRouteGuardContext {
  controller: InjectionToken;
  handler: string | symbol;
}

export interface RouteGuard {
  validate(request: Request, context: IRouteGuardContext): Promise<boolean> | boolean;
}
