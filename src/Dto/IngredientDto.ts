import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject } from "class-validator";
import { UnitOfMeasureDto } from "./UnitOfMeasureDto";



export class IngredientDto{
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly name:string;
    @IsString()
    @MaxLength(500)
    @Optional()
   
    readonly commentary:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    
    readonly email:string;
    @IsBoolean()
    readonly isInventable:boolean;
    @IsNumber()
    readonly cost:number;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly unitOfMeasure:string;
   
}