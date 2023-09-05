import { IAuthInput } from '../auth';

export interface IWithdrawInput extends IAuthInput {
  amount: number;
}

export interface INotes {
  '5': number;
  '10': number;
  '20': number;
  // '50': number;
  // '100': number;
}

export interface IWithdraw {
  currentBalance: number;
  isOverdraft: boolean;
  notes: INotes;
}
