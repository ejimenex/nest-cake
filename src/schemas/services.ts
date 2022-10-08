import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ingredientPerService } from './ingredientPerService';

@Schema()
export class Services  {

@Prop({require:true})
name:string;
@Prop()
description:string;
@Prop()
cost:number
@Prop()
otherCost:number=0
@Prop()
price:number;
@Prop()
email:string;
@Prop()
 createdDate:string;
 @Prop()
 ingredientPerService:ingredientPerService[]
}
export const ServicesSchema = SchemaFactory.createForClass(Services);