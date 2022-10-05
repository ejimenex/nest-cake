import { Document } from 'mongoose';
import { IUnitOfMeasure } from './IUnitOfMeasure';

export interface IIngredient extends Document {
  readonly name: string;
  readonly commentary: string;

  readonly email: string;

  readonly minimalStock: number;
  readonly cost:number;
  readonly unitOfMeasure: string;
  readonly isInventable:boolean
}
