import { IClient } from "./IClient";
import { IServices } from "./IServices";

export interface IOrders extends Document{
   
    readonly client:IClient;
   
   
    readonly deliveryDate:string;
   
   
    readonly ordersDate:string;
   
   
    readonly commentary:string;
   
   
    readonly ordersNumber:string;
   
    readonly email:string;
   

   
    readonly isFinished:boolean;
   
    readonly amountPaid:number
    readonly pendingAmount:number
   
    readonly subTotal:number
   
    readonly discount:number
   
    readonly total:number
   
    readonly totalQty:number
   
    readonly detail:OrdersDetail[]
}

export class OrdersDetail{
   
    readonly quantity:number
   
    readonly service:IServices
   
    readonly discount:number
   
    readonly total:number
   
    readonly totalQty:number
}
