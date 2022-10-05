
import { Document } from 'mongoose';
import { IIngredient } from './IIngredient';

export interface IInventoryIngredient extends Document {
    readonly name:string;
    
    readonly email:string;
    readonly ingredient:IIngredient;
    readonly quantity:number;
    readonly stock:number;
    readonly lastDateModified:string;
}

   