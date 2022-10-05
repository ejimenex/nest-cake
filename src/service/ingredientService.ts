import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IngredientDto } from 'src/Dto/IngredientDto';
import { IIngredient } from 'src/interface/IIngredient';
@Injectable()
export class IngredientService {
constructor(@InjectModel('ingredient') private ingredientModel:Model<IIngredient>) { }

async create(ingredientDto: IngredientDto): Promise<IIngredient> {
  let exist=this.ingredientModel.exists({name:ingredientDto.name})
  if(exist)
  {
//throw new BadRequestException("Ya existe este ingrediente");
  }
   const newSystem = await new this.ingredientModel(ingredientDto);
   return newSystem.save();
}
async update(id: string, ingredientDto: IngredientDto): Promise<IIngredient> {
    const existingIngredient = await        this.ingredientModel.findByIdAndUpdate(id, ingredientDto, { new: true });
   if (!existingIngredient) {
     throw new NotFoundException(`Producto #${id} no encontrado`);
   }
   return existingIngredient;
}
async getAll(email:string): Promise<IIngredient[]> {
    const ingredient = await this.ingredientModel.find({email:email}).sort({name:1});
    if (!ingredient || ingredient.length == 0) {
        throw new NotFoundException('No hay data aun!');
    }
    return ingredient;
}
async getAllPaged(pageNumber:number,filter:string,email:string): Promise<IIngredient[]> {
  const ingredient = await this.ingredientModel.find({name:{$regex: filter, $options: 'i'},email:email})
  .sort({name:1})
  .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
             .limit( 10 );
  if (!ingredient || ingredient.length == 0) {
      throw new NotFoundException('No hay data aun!');
  }
  return ingredient;
}
async get(SystemId: string): Promise<IIngredient> {
   const ingredient = await this.ingredientModel.findById(SystemId).exec();
   if (!ingredient) {
    throw new NotFoundException(`Producto #${SystemId} no encontrado`);
   }
   return ingredient;
}

async delete(id: string): Promise<IIngredient> {
    const deletedIngredient = await this.ingredientModel.findByIdAndDelete(id);
   if (!deletedIngredient) {
     throw new NotFoundException(`Producto #${id} no encontrado`);
   }
   return deletedIngredient;
}
}