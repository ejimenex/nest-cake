import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail, IsEmpty } from "class-validator";
import { NodeStyleEventEmitter } from "rxjs/internal/observable/fromEvent";
import { isUndefined } from "util";




export class ClientDto{
    @IsString()
    @IsNotEmpty()
    readonly name:string;
    @IsString()
   
    readonly phone:string;
    @IsString()
    @IsNotEmpty()
    
    readonly address:string;
    @IsString()
  
    readonly city:string;
    @IsString()
  
    readonly email:string;
    @IsString()
    @IsEmail()
    readonly clientEmail: string;
    readonly commentary: string;
    @IsBoolean()
    readonly notifyWhenInvoice:boolean
    readonly ordersQuantity:number;
    readonly invoiceQuantity:number;
   
}