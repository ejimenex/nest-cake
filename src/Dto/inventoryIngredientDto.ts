import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate, isNotEmpty, IsObject, IsArray } from "class-validator";
import { IngredientDto } from "./IngredientDto";
import { inventoryIngredientDetailDto } from "./InventoryIngredientDetailDto";



export class inventoryIngredientDto{
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly name:string;
    @IsString()
    @Optional()
     
    
    readonly email:string;
    @IsString()
    @Optional()
     
    
    readonly commentary:string;
    @IsObject()
    readonly ingredient:IngredientDto;
    @IsNumber()
    readonly quantity:number;
    @IsNumber()
    readonly stock:number;
    readonly lastDateModified:string;
    @IsArray()
    readonly detail:inventoryIngredientDetailDto[]
   
}