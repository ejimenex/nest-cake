import { Document } from 'mongoose';
import { IProvider } from './IProvider';

export interface IBills extends Document {
  readonly date: string;
  readonly provider: IProvider;

  readonly amount: number;
  readonly invoiceNumber: string;
  readonly email: string;
  readonly concept:string
  readonly reason:string
  readonly image:string;
}
