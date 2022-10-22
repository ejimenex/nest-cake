import { IClient } from "./IClient";
import { IServices } from "./IServices";

export interface IOrders extends Document{
   
    readonly client:IClient;
   
   
    readonly deliveryDate:string;
   
   
    readonly ordersDate:string;
   
   
    readonly commentary:string;
   
   
    readonly ordersNumber:string;
   
    readonly email:string;
   

   
    readonly isFinished:string;
   
    readonly amountPaid:number
    readonly pendingAmount:number
   
    readonly subTotal:number
   
    readonly discount:number
   
    readonly total:number
   
    readonly totalQty:number
    readonly invoiceDate:string
    readonly detail:OrdersDetail[]
    readonly payDetail:PayDetail[]
}

export class OrdersDetail{
   
    readonly quantity:number
   
    readonly service:IServices
   
    readonly discount:number
   
    readonly total:number
   
    readonly totalQty:number
}
export class PayDetail{
    readonly amount:number
    readonly payType:string
}