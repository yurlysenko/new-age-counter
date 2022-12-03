import { singleton } from 'tsyringe';
import { Model, ModelCtor, Repository, Sequelize } from 'sequelize-typescript';
import { cwd } from 'process';
import { join } from 'path';

@singleton()
export class SequelizeModule {
  private readonly sequelize: Sequelize;

  constructor() {
    console.log('Initializing Sequelize Connection');
    this.sequelize = new Sequelize({
      database: 'database',
      dialect: 'sqlite',
      storage: join(cwd(), 'sqlite/db.sqlite'),
      repositoryMode: true,
      logging: false,
      define: {
        timestamps: false,
        underscored: true,
      },
    });
  }

  registerModel = <M extends Model>(model: ModelCtor<M>): Repository<M> => {
    this.sequelize.addModels([model]);

    return this.sequelize.getRepository(model);
  };

  closeConnection = async (): Promise<void> => {
    await this.sequelize.close();
  };

  getInstance = (): Sequelize => this.sequelize;
}
