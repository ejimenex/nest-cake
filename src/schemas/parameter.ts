import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client';
import { ingredientPerService } from './ingredientPerService';
import { Services } from './services';

@Schema()
export class Parameter  {

    @Prop()
    readonly email:string;
    @Prop()
   
    readonly invoicePrefix:string;    
    @Prop()
    readonly invoiceSecuente:number;
    @Prop()
  
    readonly companyName:string;
    @Prop()
 
    readonly companyAddress: string;
    @Prop()
 
    readonly companyPhone: string;
    @Prop()
 
    readonly companyEmail: string;
        @Prop()
    readonly currency:string;
 
}



export const ParameterSchema = SchemaFactory.createForClass(Parameter);