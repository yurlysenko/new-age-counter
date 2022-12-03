import { singleton } from 'tsyringe';
import { AccessControl } from 'accesscontrol';
import { STATIC_PERMISSIONS } from '../../common/configuration/permissions';
import { IRouteGuardContext } from '@core/types/route-guard';
import { getMetadata } from '@core/utils/reflect/metadata';
import { PERMISSION_METADATA_KEY, REQUEST_ACTION_MAP } from './constants';
import { IRoutePermissions } from '../../common/types';
import { Possession } from './types';
import { METHODS } from 'http';

@singleton()
export class AccessControlModule extends AccessControl {
  constructor() {
    super(STATIC_PERMISSIONS);
    this.lock();
  }

  getPermissionFromContext = (context: IRouteGuardContext): IRoutePermissions | undefined =>
    getMetadata<IRoutePermissions>(PERMISSION_METADATA_KEY, context.controller, context.handler);

  getPermission = (
    method: string,
    possession: Possession,
    role: string,
    resource: string,
  ): boolean => {
    if (!METHODS.includes(method)) {
      throw new Error(`Invalid HTTP method provided: ${method}`);
    }
    if (!Object.keys(REQUEST_ACTION_MAP).includes(method.toLowerCase())) {
      return true;
    }
    const handlerAction = REQUEST_ACTION_MAP[method.toLowerCase()][possession];
    return this.can(role)[handlerAction](resource).granted;
  };
}
