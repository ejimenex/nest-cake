import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UnitOfMeasure{

@Prop({require:true})
name:string;
}
export const UnitOfMeasureSchema = SchemaFactory.createForClass(UnitOfMeasure);