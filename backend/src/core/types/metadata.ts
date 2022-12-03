import { HttpMethods } from './index';
import { RouterOptions } from 'express';
import { InjectionToken } from 'tsyringe';
import { RouteGuard } from './route-guard';

export interface IRouteHandlerMetadata {
  route: string;
  method: HttpMethods;
}

export interface IRouteControllerMetadata {
  route: string;
  config: RouterOptions;
}

export interface IGuardMetadata {
  token: InjectionToken<RouteGuard>;
}
