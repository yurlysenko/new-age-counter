import { SetMetadata } from '@core/utils/reflect/metadata';
import { PERMISSION_METADATA_KEY } from '../../../libs/accesscontrol/constants';
import { IRoutePermissions } from '../../types';

export const SetPermission = (config: IRoutePermissions) =>
  SetMetadata<IRoutePermissions>(PERMISSION_METADATA_KEY, config);
