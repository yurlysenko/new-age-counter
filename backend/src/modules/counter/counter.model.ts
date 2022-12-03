import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface ICounterAttributes {
  id: number;
  value: number;
  created_at: Date;
}

export type ICounterCreation = Pick<ICounterAttributes, 'value'>;

@Table({ tableName: 'counters', timestamps: false })
export class CounterModel extends Model<ICounterAttributes, ICounterCreation> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: number;

  @CreatedAt
  @Column
  created_at: Date;
}
