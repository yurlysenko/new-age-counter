import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }): Promise<void> => {
  await context.insert(null, 'users', {
    username: 'admin',
    password: 'securepass',
    role: 'ADMIN',
  });
  await context.insert(null, 'users', {
    username: 'member',
    password: 'securepass',
    role: 'MEMBER',
  });
};

export const down: MigrationFn<QueryInterface> = async (): Promise<void> => {};
