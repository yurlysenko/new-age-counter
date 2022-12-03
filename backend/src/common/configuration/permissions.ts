import { EUserRole } from '../../modules/users/enums';
import { AccessControlPermissions } from '../../libs/accesscontrol/types';

export const STATIC_PERMISSIONS: Record<EUserRole, AccessControlPermissions<'counter'>> = {
  [EUserRole.ADMIN]: {
    counter: {
      'update:any': ['*'],
      'read:any': ['*'],
    },
  },
  [EUserRole.MEMBER]: {
    counter: {
      'read:any': ['*'],
    },
  },
};
