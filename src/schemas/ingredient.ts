import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Ingredients  {

@Prop({require:true})
name:string;
@Prop()
commentary:string;
@Prop()
cost:number
@Prop()
minimalStock:number;
@Prop()
email:string;
@Prop()
unitOfMeasure:string;
@Prop()
isInventable:boolean
}
export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);