import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Account  {

@Prop({require:true})
name:string;
@Prop()
lastName:string;
@Prop()
password:string
@Prop()
language:string;
@Prop()
userEmail:string;
@Prop()
isGoogleEmail:boolean;
@Prop()
alias:string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);