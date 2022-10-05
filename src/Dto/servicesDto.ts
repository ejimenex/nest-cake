import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, IsArray, IsDateString } from "class-validator";
import { IngredientPerServicesDto } from "./ingredientPerServices";



export class ServiceDto{
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly name:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly description:string;
    @IsNumber()
    readonly price:number;
    @IsNumber()
    readonly cost:number;
    @IsNumber()
    readonly otherCost:number;
    @IsArray()    
    readonly ingredientPerService:IngredientPerServicesDto[];
    @IsString()
    @IsNotEmpty()
    readonly email:string;
    @IsString()
    @Optional()
     createdDate:string   ;
   
}