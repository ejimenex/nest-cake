import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client';
import { ingredientPerService } from './ingredientPerService';
import { Services } from './services';

@Schema()
export class Invoice  {

    @Prop()
    readonly client:Client;
    @Prop()
   
    readonly deliveryDate:string;
    @Prop()
   
    readonly ordersDate:string;
    @Prop()
   
    readonly commentary:string;
    @Prop()
   
    readonly ordersNumber:string;
    @Prop()
    readonly email:string;
    @Prop()


    @Prop()
    readonly amountPaid:number
    @Prop()
    readonly pendingAmount:number
    @Prop()
    readonly subTotal:number
    @Prop()
    readonly discount:number
    @Prop()
    readonly total:number
    @Prop()
    readonly totalQty:number
    @Prop()
    readonly invoiceDate:string
    @Prop()
    readonly detail:OrdersDetail[]
    @Prop()
    readonly payDetail:PayDetail[]
}

export class OrdersDetail{
    @Prop()
    readonly quantity:number
    @Prop()
    readonly service:Services
    @Prop()
    readonly discount:number
    @Prop()
    readonly total:number
    @Prop()
    readonly price:number

}
export class PayDetail{
    @Prop()
    readonly amount:number
    @Prop()
    readonly payType:string
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);