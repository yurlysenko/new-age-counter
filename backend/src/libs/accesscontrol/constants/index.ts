import { HttpMethods } from '@core/types';
import { Query } from 'accesscontrol';
import { Possession } from '../types';

export const PERMISSION_METADATA_KEY = 'metadata::permissions';

export const REQUEST_ACTION_MAP: Record<
  HttpMethods,
  Record<Possession, keyof Omit<Query, 'role' | 'resource'>>
> = {
  get: { own: 'readOwn', any: 'readAny' },
  post: { own: 'createOwn', any: 'createAny' },
  delete: { own: 'deleteOwn', any: 'deleteAny' },
  put: { own: 'updateOwn', any: 'updateAny' },
  patch: { own: 'updateOwn', any: 'updateAny' },
};
