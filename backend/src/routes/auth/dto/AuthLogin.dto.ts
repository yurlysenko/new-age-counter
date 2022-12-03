import { IUserAuthenticate } from '../../../modules/users/types';
import { IsString } from 'class-validator';

export class AuthLoginDto implements IUserAuthenticate {
  @IsString()
  username: string;

  @IsString()
  password: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
