import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail } from "class-validator";
import { ProviderDto } from "./Provider";


export class BillsDto{
    readonly date: string;
    readonly provider: ProviderDto;
  
    readonly amount: number;
    readonly invoiceNumber: string;
    readonly email: string;
    readonly concept:string
    readonly reason:string
    readonly image:string;
}