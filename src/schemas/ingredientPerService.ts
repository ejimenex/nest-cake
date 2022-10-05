import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredients } from './ingredient';
import { UnitOfMeasure } from './unitOfMeasure';

@Schema()
export class ingredientPerService  {

@Prop()
quantity:number;
@Prop()
ingredient:Ingredients;
}
export const ingredientPerServiceSchema = SchemaFactory.createForClass(ingredientPerService);