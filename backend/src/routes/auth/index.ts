import { Controller, Post } from '@core/decorators';
import { UserModule } from '../../modules/users/user.module';
import { RouteHandler } from '@core/types';
import { AuthLoginDto } from './dto/AuthLogin.dto';
import { Request } from 'express';
import { validateObject } from '@core/utils/class-validator/validateObject';
import { BadRequestException } from '@core/exceptions/BadRequestException';
import { UnauthorizedException } from '@core/exceptions/UnauthorizedException';
import { JsonWebTokenModule } from '../../libs/jsonwebtoken/json-web-token.module';
import { IJwtToken } from '../../libs/jsonwebtoken/types';

@Controller('auth')
export class AuthRoute {
  constructor(
    private readonly userModule: UserModule,
    private readonly jsonWebTokenModule: JsonWebTokenModule,
  ) {}

  @Post('login')
  login: RouteHandler = async (req: Request): Promise<IJwtToken> => {
    const dto = new AuthLoginDto(req.body);

    validateObject(dto, (err): void => {
      throw new BadRequestException(err);
    });

    const find = await this.userModule.authorize(dto);

    if (!find) {
      throw new UnauthorizedException();
    }

    const payload = this.jsonWebTokenModule.createPayload(find);

    return {
      ...payload,
      access_token: this.jsonWebTokenModule.signPayload(payload),
    };
  };
}
