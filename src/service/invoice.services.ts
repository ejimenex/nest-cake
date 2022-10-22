import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { OrdersDto } from 'src/Dto/OrdersDto';
import { IOrders } from 'src/interface/IOrders';
import { ClientService } from './client.service';
@Injectable()
export class  InvoiceService {
constructor(@InjectModel('invoice') private serviceModel:Model<IOrders>,
private clientService:ClientService) { }


async create(OrdersDto: OrdersDto): Promise<IOrders> {

   const newSystem = await new this.serviceModel(OrdersDto);
   return newSystem.save();
}


async getAllPaged(pageNumber:number,filter:string,email:string): Promise<IOrders[]> {
  const service = await this.serviceModel.find({name:{$regex: filter, $options: 'i'},email:email})
  .sort({name:1})
  .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
             .limit( 10 );
  if (!service || service.length == 0) {
     return []
  }
  return service;
}
async get(SystemId: string): Promise<IOrders> {
   const service = await this.serviceModel.findById(SystemId).exec();
   
   return service;
}

async delete(id: string): Promise<IOrders> {
    const deletedService = await this.serviceModel.findByIdAndDelete(id);
   if (!deletedService) {
     throw new NotFoundException(`notFound`);
   }
   return deletedService;
}
}