import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { inventoryIngredientDto } from 'src/Dto/inventoryIngredientDto';
import { IInventoryIngredient } from 'src/interface/IInventoryIngredient';
  @Injectable()
  export class InventoryIngredientService {
    constructor(
      @InjectModel('inventoryIngredient') private inventoryRepository: Model<IInventoryIngredient>
      
    ) {}
  
    async create(inventoryIngredientDto: inventoryIngredientDto): Promise<IInventoryIngredient> {
      let exist = await this.inventoryRepository
        .find({ingredient: inventoryIngredientDto.ingredient })
        .exec();
      console.log(exist);
      if (exist.length > 0) {
        throw new BadRequestException('existInventory');
      }
      const newInventory = await new this.inventoryRepository(inventoryIngredientDto);
      return newInventory.save();
    }
    async update(id: string, inventoryIngredientDto: inventoryIngredientDto): Promise<IInventoryIngredient> {
      const data = await this.inventoryRepository.findByIdAndUpdate(id, inventoryIngredientDto, {
        new: true,
      });
      if (!data) {
        throw new NotFoundException(`User #${id} no encontrado`);
      }
      return data;
    }
  
    async getAll(email:string): Promise<IInventoryIngredient[]> {
        const data = await this.inventoryRepository.find({email:email}).sort({lastDateModified:1});
        if (!data || data.length == 0) {
            throw new NotFoundException('No hay data aun!');
        }
        return data;
    }
    async getAllPaged(pageNumber:number,filter:string,email:string): Promise<IInventoryIngredient[]> {
      const data = await this.inventoryRepository.find({name:{$regex: filter, $options: 'i'},email:email})
      .sort({lastDateModified:-1})
      .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
                 .limit( 10 );
      if (!data || data.length == 0) {
          throw new NotFoundException('No hay data aun!');
      }
      return data;
    }
  
    async get(id: string): Promise<IInventoryIngredient> {
      const obj = await this.inventoryRepository.findById(id).exec();
      if (!obj) {
      }
      return obj;
    }

    async delete(id: string): Promise<IInventoryIngredient> {
      const deletedData = await this.inventoryRepository.findByIdAndDelete(id);
      if (!deletedData) {
        throw new NotFoundException(`User #${id} no encontrado`);
      }
      return deletedData;
    }
  }
  