import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail, IsEmpty } from "class-validator";





export class ParameterDto{
    @IsString()
    readonly email:string;
    @IsString()
   
    readonly invoicePrefix:string;    
    
    readonly invoiceSecuente:number;
    @IsString()
  
    readonly companyName:string;
    @IsString()
 
    readonly companyAddress: string;
    @IsString()
 
    readonly companyPhone: string;
    @IsEmail()
 
    readonly companyEmail: string;
    readonly currency:string;

   
}