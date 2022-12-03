import { singleton } from 'tsyringe';
import { CronJob } from 'cron';
import { Repository } from 'sequelize-typescript';
import { CounterModel } from './counter.model';
import { SequelizeModule } from '../../libs/sequelize/sequelize.module';

@singleton()
export class CounterModule {
  private currentCounter = 0;

  private readonly counterRepo: Repository<CounterModel>;

  increment = (): number => (this.currentCounter += 1);
  decrement = (): number => (this.currentCounter -= 1);
  getCounter = (): number => this.currentCounter;

  constructor(private readonly sequelizeModule: SequelizeModule) {
    this.counterRepo = this.sequelizeModule.registerModel(CounterModel);

    CronJob.from({
      onTick: () => this.cronJob(),
      cronTime: '0 * * * * *',
      runOnInit: true,
      start: true,
    });
  }

  private async cronJob(): Promise<void> {
    if (this.currentCounter === 0) {
      return;
    }

    await this.counterRepo.create({
      value: this.currentCounter,
    });

    this.currentCounter = 0;
  }

  getHistory = async (): Promise<CounterModel[]> =>
    this.counterRepo.findAll({
      attributes: ['value', 'created_at'],
      order: [['created_at', 'DESC']],
    });
}
