export interface ICounterResponse {
  counter_value: number;
}

export interface ICounterItem {
  value: number;
  created_at: string;
}

export interface IUseCounterHook {
  counter: number | undefined;
  history: ICounterItem[] | undefined;
  increment: () => void;
  decrement: () => void;
}
