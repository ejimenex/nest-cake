import { Document } from 'mongoose';

export interface  IAccount extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly password: string;
  readonly language:string;
  readonly isGoogleEmail:boolean
  readonly alias:string
}
export interface  IAccountForGet extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly language:string;
}
