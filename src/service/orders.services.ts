import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { OrdersDto } from 'src/Dto/OrdersDto';
import { IOrders } from 'src/interface/IOrders';
import { ClientService } from './client.service';
@Injectable()
export class  OrderService {
constructor(@InjectModel('orders') private serviceModel:Model<IOrders>) { }


async create(OrdersDto: OrdersDto): Promise<IOrders> {
  let exist=this.serviceModel.find({ordersNumber:OrdersDto.ordersNumber,email:OrdersDto.email})
  if ((await exist).length > 0) {
throw new BadRequestException("existOrder");
  }
   const newSystem = await new this.serviceModel(OrdersDto);
   return newSystem.save();
}
async update(id: string, OrdersDto: OrdersDto): Promise<IOrders> {
    const existingservice = await        this.serviceModel.findByIdAndUpdate(id, OrdersDto, { new: true });
   if (!existingservice) {
     throw new NotFoundException(`Producto #${id} no encontrado`);
   }
   return existingservice;
}
async getAll(email:string): Promise<IOrders[]> {
    const service = await this.serviceModel.find({email:email}).sort({name:1});
    if (!service || service.length == 0) {
        throw new NotFoundException('NoData!');
    }
    return service;
}
async getAllPaged(pageNumber:number,filter:string,email:string,finished:boolean): Promise<IOrders[]> {
  const service = await this.serviceModel.find({name:{$regex: filter, $options: 'i'},email:email,isFinished:finished})
  .sort({name:1})
  .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
             .limit( 10 );
  if (!service || service.length == 0) {
      throw new NotFoundException('NoData!');
  }
  return service;
}
async get(SystemId: string): Promise<IOrders> {
   const service = await this.serviceModel.findById(SystemId).exec();
   if (!service) {
    throw new NotFoundException(`Servicio #${SystemId} no encontrado`);
   }
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