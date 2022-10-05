import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate } from "class-validator";
import { IngredientDto } from "./IngredientDto";



export class  IngredientPerServicesDto{

    readonly quantity:number;
    readonly ingredient:IngredientDto
  
}