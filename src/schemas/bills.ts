
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Provider } from './provider';
@Schema()
export class Bills  {

@Prop()
readonly date: string;
@Prop()
readonly provider: Provider;
@Prop()
readonly amount: number;
@Prop()
readonly invoiceNumber: string;
@Prop()
readonly email: string;
@Prop()
readonly concept:string
@Prop()
readonly reason:string
@Prop()
readonly image:string;
}
export const BillsSchema = SchemaFactory.createForClass(Bills);