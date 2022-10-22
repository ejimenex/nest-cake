import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Provider  {

@Prop({require:true})
name:string;
@Prop()
address:string;

@Prop()
phone:string;
@Prop()
email:string;
@Prop()
clientEmail:string;

@Prop()
 commentary: string;

}
export const ProviderSchema = SchemaFactory.createForClass(Provider);