import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { ServiceDto } from 'src/Dto/servicesDto';
import { IServices } from 'src/interface/IServices';
import { ClientService } from './client.service';
@Injectable()
export class  ServicesService {
constructor(@InjectModel('service') private serviceModel:Model<IServices>) { }

async create(ServiceDto: ServiceDto): Promise<IServices> {
  ServiceDto.createdDate=new Date().toISOString();
  let exist=this.serviceModel.exists({name:ServiceDto.name})
  if(exist)
  {
//throw new BadRequestException("Ya existe este ingrediente");
  }
   const newSystem = await new this.serviceModel(ServiceDto);
   return newSystem.save();
}
async update(id: string, ServiceDto: ServiceDto): Promise<IServices> {
    const existingservice = await        this.serviceModel.findByIdAndUpdate(id, ServiceDto, { new: true });
   if (!existingservice) {
     throw new NotFoundException(`Producto #${id} no encontrado`);
   }
   return existingservice;
}
async getAll(email:string): Promise<IServices[]> {
    const service = await this.serviceModel.find({email:email}).sort({name:1});
    if (!service || service.length == 0) {
        throw new NotFoundException('No hay data aun!');
    }
    return service;
}
async getAllPaged(pageNumber:number,filter:string,email:string): Promise<IServices[]> {
  const service = await this.serviceModel.find({name:{$regex: filter, $options: 'i'},email:email})
  .sort({name:1})
  .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
             .limit( 10 );
  if (!service || service.length == 0) {
      throw new NotFoundException('No hay data aun!');
  }
  return service;
}
async get(SystemId: string): Promise<IServices> {
   const service = await this.serviceModel.findById(SystemId).exec();
   if (!service) {
    throw new NotFoundException(`Servicio #${SystemId} no encontrado`);
   }
   return service;
}

async delete(id: string): Promise<IServices> {
    const deletedService = await this.serviceModel.findByIdAndDelete(id);
   if (!deletedService) {
     throw new NotFoundException(`Producto #${id} no encontrado`);
   }
   return deletedService;
}
}