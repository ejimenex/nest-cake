import { Document } from 'mongoose';
import { IngredientPerServicesDto } from 'src/Dto/ingredientPerServices';

export interface IServices extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly cost: number;
  readonly otherCost: number;
  readonly ingredientPerService: IngredientPerServicesDto[];
  readonly email: string;
  readonly createdDate: string;
}
