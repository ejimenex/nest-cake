import { Document } from 'mongoose';

export interface IUnitOfMeasure extends Document
{
    readonly name:string;
   
}