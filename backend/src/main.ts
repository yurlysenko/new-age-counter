import 'reflect-metadata';
import { container } from 'tsyringe';
import { UmzugModule } from './libs/umzug/umzug.module';
import { SequelizeModule } from './libs/sequelize/sequelize.module';
import { ExpressApp } from '@core/app';
import { CounterRoute } from './routes/counter';
import { AuthRoute } from './routes/auth';
import { CounterModule } from './modules/counter/counter.module';
import { PORT } from './common/configuration/env';

const bootstrap = async () => {
  const app = container.resolve(ExpressApp);

  // Initialize Sequelize Instance
  const sequelizeModule = container.resolve(SequelizeModule);

  // Start database migrations
  const migrationModule = container.resolve(UmzugModule);
  await migrationModule.initialize(sequelizeModule.getInstance());
  await migrationModule.startMigration();

  // Register Modules
  [CounterModule].forEach((token) => container.resolve(token));

  // Register Routes
  app.registerRoutes([CounterRoute, AuthRoute]);

  // Start Listeners
  app.listen(+PORT!);
};

void bootstrap();
