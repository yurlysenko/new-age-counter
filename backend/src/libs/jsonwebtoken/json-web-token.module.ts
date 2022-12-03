import { injectable } from 'tsyringe';
import { UserModel } from '../../modules/users/user.model';
import { IJwtPayload } from './types';
import { decode, sign, verify } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_ISSUER, JWT_SECRET } from '../../common/configuration/env';
import { IncomingHttpHeaders } from 'http';

@injectable()
export class JsonWebTokenModule {
  createPayload = (user: UserModel): IJwtPayload => ({
    sub: '' + user.id,
    username: user.username,
    role: user.role,
  });

  signPayload = (payload: IJwtPayload): string =>
    sign(payload, JWT_SECRET!, {
      issuer: JWT_ISSUER,
      expiresIn: JWT_EXPIRATION,
    });

  verifyToken = (token: string): IJwtPayload | undefined => {
    try {
      verify(token, JWT_SECRET!, {
        issuer: JWT_ISSUER,
      });
      return decode(token, { json: true })!;
    } catch (e) {
      return undefined;
    }
  };

  getTokenFromHeaders = ({ authorization }: IncomingHttpHeaders): string | undefined => {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return;
    }

    return authorization.replace('Bearer', '').trim();
  };
}
