import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredients } from './ingredient';
import { UnitOfMeasure } from './unitOfMeasure';

@Schema()
export class inventoryIngredient  {
    @Prop()
     name:string;
     
     @Prop()
     email:string;
     @Prop()
     ingredient:Ingredients;
    
     @Prop()
     stock:number;
     @Prop()
     lastDateModified:string;
     @Prop()
     detail:[]
}
export const InventoryIngredientSchema = SchemaFactory.createForClass(inventoryIngredient);