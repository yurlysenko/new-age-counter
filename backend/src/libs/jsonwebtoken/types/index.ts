import { JwtPayload } from 'jsonwebtoken';
import { EUserRole } from '../../../modules/users/enums';

export interface IJwtPayload extends JwtPayload {
  sub?: string;
  role?: EUserRole;
  username?: string;
}

export interface IJwtToken extends IJwtPayload {
  access_token?: string;
}
