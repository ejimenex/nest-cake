import { IsNotEmpty, IsNumber, IsString,IsBoolean } from "class-validator";

export class inventoryIngredientDetailDto{
  
    readonly date:string;
    @IsNumber()
    readonly quantity:number;
    @IsBoolean()
    readonly isEntry:boolean;
    readonly commentary:string;
   
}