import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';


@Schema()
export class Systems{

@Prop({require:true})
name:string;

@Prop()
description:string;
@Prop()
urlDevops:string;
@Prop()
project:string;
@Prop()
siteUat:string;
@Prop()
siteProd:string;
@Prop()
siteQa:string;
@Prop()
versionNet:string;
@Prop()
designPatter:string;
@Prop()
isInProduction:boolean;
@Prop()
createdDate:string;
@Prop()
systemType:string;
}
export const SystemsSchema = SchemaFactory.createForClass(Systems);