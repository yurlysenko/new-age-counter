import { literal, QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { DataType } from 'sequelize-typescript';

export const up: MigrationFn<QueryInterface> = async ({ context }): Promise<void> => {
  await context.createTable('users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    role: {
      type: DataType.ENUM('ADMIN', 'MEMBER'),
      allowNull: false,
      defaultValue: 'MEMBER',
    },
  });

  await context.createTable('counters', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  });
};

export const down: MigrationFn<QueryInterface> = async ({ context }): Promise<void> => {
  await context.dropTable('users');
};
