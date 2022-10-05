import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail } from "class-validator";




export class AccountDto{
    @IsString()
    @IsNotEmpty()
    readonly name:string;
    @IsString()
   
    readonly lastName:string;
    @IsString()
    @IsNotEmpty()
    
    password:string;
    @IsString()
  
    readonly language:string;
    @IsString()
    @IsEmail()
    readonly userEmail:string;
    readonly isGoogleEmail:boolean;
    @IsString()
    @Optional()
    readonly alias:string;
}
export class AccountLoginDto{
   
   readonly password:string;
   @IsEmail()
    readonly userEmail:string;
}