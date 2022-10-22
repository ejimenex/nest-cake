import { Document } from 'mongoose';

export interface IParameter extends Document {
  readonly email:string; 
  readonly invoicePrefix:string;   
  
  readonly invoiceSecuente:number; 
  readonly companyName:string; 
  readonly companyAddress: string;
  readonly companyPhone: string;
  readonly companyEmail: string;
  readonly currency:string;
}
