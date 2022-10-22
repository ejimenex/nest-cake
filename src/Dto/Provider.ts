import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsEmail, IsEmpty } from "class-validator";





export class ProviderDto{
    @IsString()
    readonly name:string;
    @IsString()
   
    readonly phone:string;
    @IsString()
    
    readonly address:string;
    @IsString()
  
    readonly email:string;
    @IsString()
 
    readonly commentary: string;

   
}