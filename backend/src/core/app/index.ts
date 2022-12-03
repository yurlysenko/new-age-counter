import { InjectionToken, singleton } from 'tsyringe';
import express, { Express } from 'express';
import cors from 'cors';
import { ControllerManager } from './controller.manager';

@singleton()
export class ExpressApp {
  private readonly app: Express;

  constructor(private readonly routeManager: ControllerManager) {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cors());
  }

  registerRoutes = (routes: InjectionToken[]) => {
    const expressRouters = routes.map(this.routeManager.initializeController);

    this.app.use(...expressRouters);
  };

  listen = (port: number) => {
    this.app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  };
}
