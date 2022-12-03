import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { EUserRole } from './enums';

export interface IUserAttributes {
  id: number;
  username: string;
  password: string;
  role: EUserRole;
}

export type IUserCreation = Pick<IUserAttributes, 'username' | 'password' | 'role'>;

@Table({ tableName: 'users' })
export class UserModel extends Model<IUserAttributes, IUserCreation> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING(32))
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.ENUM(...Object.values(EUserRole)))
  role: EUserRole;
}
