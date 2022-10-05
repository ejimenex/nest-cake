import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail, IsEmpty, IsArray, isObject } from "class-validator";
import { NodeStyleEventEmitter } from "rxjs/internal/observable/fromEvent";
import { isUndefined } from "util";
import { ClientDto } from "./ClientDto";
import { ServiceDto } from "./servicesDto";




export class OrdersDto{
    @IsObject()
    readonly client:ClientDto;
    @IsString()
   
    readonly deliveryDate:string;
    @IsString()
   
    readonly ordersDate:string;
    @IsString()
   
    readonly commentary:string;
    @IsString()
   
    readonly ordersNumber:string;
    @IsString()
    readonly email:string;
    @IsBoolean()
    readonly isFinished:boolean;
    @IsNumber()
    readonly amountPaid:number
    @IsNumber()
    readonly pendingAmount:number
    @IsNumber()
    readonly subTotal:number
    @IsNumber()
    readonly discount:number
    @IsNumber()
    readonly total:number
    @IsNumber()
    readonly totalQty:number
    @IsArray()
    readonly detail:OrdersDetailDto[]
}

export class OrdersDetailDto{
    @IsNumber()
    readonly quantity:number
   @IsObject()
    readonly service:ServiceDto
    @IsNumber()
    readonly discount:number
    @IsNumber()
    readonly total:number
    @IsNumber()
    readonly price:number
   
}

