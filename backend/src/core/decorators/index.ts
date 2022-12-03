import { RouterOptions } from 'express';
import { IGuardMetadata, IRouteControllerMetadata, IRouteHandlerMetadata } from '../types/metadata';
import {
  GUARD_METADATA,
  ROUTE_CONTROLLER_METADATA,
  ROUTE_HANDLER_METADATA,
} from '../constants/reflect-metadata';
import { InjectionToken, singleton } from 'tsyringe';
import { RouteGuard } from '../types/route-guard';

function setMetadata<T extends object>(metadataKey: string, metadataValue: T) {
  return function (target: any, key?: string) {
    if (key) {
      const metadata = Reflect.getMetadata(metadataKey, target, key) || {};
      Reflect.defineMetadata(metadataKey, { ...metadata, ...metadataValue }, target, key);
    } else {
      const metadata = Reflect.getMetadata(metadataKey, target) || {};
      Reflect.defineMetadata(metadataKey, { ...metadata, ...metadataValue }, target);
    }
  };
}

export const Controller = (path?: string, config?: RouterOptions) => {
  return function (target: any) {
    setMetadata<IRouteControllerMetadata>(ROUTE_CONTROLLER_METADATA, {
      route: path ?? '/',
      config: config ?? {},
    })(target);
    singleton()(target);
  };
};

export const Get = (route?: string) =>
  setMetadata<IRouteHandlerMetadata>(ROUTE_HANDLER_METADATA, {
    route: route ?? '/',
    method: 'get',
  });

export const Post = (route?: string) =>
  setMetadata<IRouteHandlerMetadata>(ROUTE_HANDLER_METADATA, {
    route: route ?? '/',
    method: 'post',
  });

export const Patch = (route?: string) =>
  setMetadata<IRouteHandlerMetadata>(ROUTE_HANDLER_METADATA, {
    route: route ?? '/',
    method: 'patch',
  });

export const Put = (route?: string) =>
  setMetadata<IRouteHandlerMetadata>(ROUTE_HANDLER_METADATA, {
    route: route ?? '/',
    method: 'put',
  });

export const Delete = (route?: string) =>
  setMetadata<IRouteHandlerMetadata>(ROUTE_HANDLER_METADATA, {
    route: route ?? '/',
    method: 'delete',
  });

export const UseGuard = (token: InjectionToken<RouteGuard>) =>
  setMetadata<IGuardMetadata>(GUARD_METADATA, { token });
