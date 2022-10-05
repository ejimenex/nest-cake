import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Client  {

@Prop({require:true})
name:string;
@Prop()
address:string;
@Prop()
city:string
@Prop()
phone:string;
@Prop()
email:string;
@Prop()
clientEmail:string;
@Prop()
 ordersQuantity:number;
 @Prop()
invoiceQuantity:number;
@Prop()
 commentary: string;
@Prop()
 notifyWhenInvoice:boolean
}
export const ClientSchema = SchemaFactory.createForClass(Client);