import { Document } from 'mongoose';

export interface IClient extends Document {
  readonly name: string;
  readonly address: string;

  readonly email: string;
  readonly clientEmail: string;
  readonly phone: string;
  readonly city: string;
  readonly ordersQuantity: number;
  readonly invoiceQuantity: number;
  readonly commentary: string;
  readonly notifyWhenInvoice:boolean
}
