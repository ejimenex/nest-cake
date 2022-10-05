import { Document } from 'mongoose';
import { IIngredient } from './IIngredient';

export interface IIngredientPerService extends Document {
  readonly quantity: number;
  readonly ingredientPerService: IIngredient
}
