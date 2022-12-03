import { injectable } from 'tsyringe';
import { IRouteGuardContext, RouteGuard } from '@core/types/route-guard';
import { Request } from 'express';
import { JsonWebTokenModule } from '../libs/jsonwebtoken/json-web-token.module';
import { AccessControlModule } from '../libs/accesscontrol/access-control.module';
import { UnauthorizedException } from '@core/exceptions/UnauthorizedException';

@injectable()
export class AccessGuard implements RouteGuard {
  constructor(
    private readonly jsonWebTokenModule: JsonWebTokenModule,
    private readonly accessControlModule: AccessControlModule,
  ) {}

  validate(req: Request, context: IRouteGuardContext): boolean {
    const jwtToken = this.jsonWebTokenModule.getTokenFromHeaders(req.headers);
    if (!jwtToken) return false;

    const payload = this.jsonWebTokenModule.verifyToken(jwtToken);
    if (!payload) return false;

    const permissions = this.accessControlModule.getPermissionFromContext(context);

    if (permissions) {
      const isGranted = this.accessControlModule.getPermission(
        req.method,
        'any',
        payload.role!,
        permissions.resource,
      );

      if (!isGranted) {
        throw new UnauthorizedException('You do not have permission to do this.');
      }
    }

    return true;
  }
}
