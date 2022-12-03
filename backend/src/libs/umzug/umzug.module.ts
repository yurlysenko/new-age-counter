import { singleton } from 'tsyringe';
import { RunnableMigration, SequelizeStorage, Umzug } from 'umzug';
import { join } from 'path';
import { ConsoleAdapter } from './adapters/console.adapter';
import { Sequelize } from 'sequelize-typescript';
import { MigrateUpOptions } from 'umzug/lib/types';
import { QueryInterface } from 'sequelize';
import { readdir } from 'fs';
import { promisify } from 'util';

@singleton()
export class UmzugModule {
  private instance: Umzug;

  initialize = async (sequelize: Sequelize) => {
    const cwd = join(__dirname, 'migrations');

    const files = await promisify(readdir)(cwd, { encoding: 'utf-8' });

    const migrationEsModules = files.map(
      async (fileName): Promise<RunnableMigration<QueryInterface>> => {
        const module = await import(`./migrations/${fileName}`);
        return {
          name: fileName,
          up: module.up ?? (() => Promise.resolve()),
          down: module.down ?? (() => Promise.resolve()),
        };
      },
    );

    this.instance = new Umzug({
      migrations: await Promise.all(migrationEsModules),
      context: sequelize.getQueryInterface(),
      logger: new ConsoleAdapter(),
      storage: new SequelizeStorage({ sequelize }),
    });
  };

  startMigration = async (options?: MigrateUpOptions): Promise<void> => {
    await this.instance.up(options);
  };
}
