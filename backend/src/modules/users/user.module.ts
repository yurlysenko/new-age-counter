import { singleton } from 'tsyringe';
import { SequelizeModule } from '../../libs/sequelize/sequelize.module';
import { Repository } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { IUserAuthenticate } from './types';

@singleton()
export class UserModule {
  private readonly userRepo: Repository<UserModel>;

  constructor(private readonly sequelizeModule: SequelizeModule) {
    this.userRepo = this.sequelizeModule.registerModel(UserModel);
  }

  authorize = (dto: IUserAuthenticate): Promise<UserModel | null> =>
    this.userRepo.findOne({
      where: { username: dto.username, password: dto.password },
    });
}
