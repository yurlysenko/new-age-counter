import { Controller, Get, Patch, UseGuard } from '@core/decorators';
import { AccessGuard } from '../../guards/access.guard';
import { CounterModule } from '../../modules/counter/counter.module';
import { ICounterResponse } from './types';
import { SetPermission } from '../../common/decorators/security/permissions';
import { CounterModel } from '../../modules/counter/counter.model';

@Controller('counter')
@UseGuard(AccessGuard)
export class CounterRoute {
  constructor(private readonly counterModule: CounterModule) {}

  @Get('current')
  @SetPermission({ resource: 'counter' })
  getCurrent = (): ICounterResponse => ({
    counter_value: this.counterModule.getCounter(),
  });

  @Get('history')
  @SetPermission({ resource: 'counter' })
  getHistory = (): Promise<CounterModel[]> => this.counterModule.getHistory();

  @Patch('increment')
  @SetPermission({ resource: 'counter' })
  incrementCounter = (): ICounterResponse => ({
    counter_value: this.counterModule.increment(),
  });

  @Patch('decrement')
  @SetPermission({ resource: 'counter' })
  decrementCounter = (): ICounterResponse => ({
    counter_value: this.counterModule.decrement(),
  });
}
