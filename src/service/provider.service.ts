import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProviderDto } from 'src/Dto/Provider';
import { IProvider } from 'src/interface/IProvider';
@Injectable()
export class ProviderService {
  constructor(@InjectModel('provider') private providerModel: Model<IProvider>) {}

  async create(ProviderDto: ProviderDto): Promise<IProvider> {
    let exist = this.providerModel.find({
      name: ProviderDto.name,
      email: ProviderDto.email,
    });
    console.log(exist);
    if ((await exist).length > 0) {
      throw new BadRequestException('existProvider');
    }
    const newClient = await new this.providerModel(ProviderDto);
    return newClient.save();
  }
  async update(id: string, ProviderDto: ProviderDto): Promise<IProvider> {
    const data = await this.providerModel.findByIdAndUpdate(id, ProviderDto, {
      new: false,
    });
    if (!data) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    return data;
  }
  async getAll(email:string): Promise<IProvider[]> {
    const service = await this.providerModel.find({email:email}).sort({ name: 1 });
    if (!service || service.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return service;
  }
  async getAllPaged(
    pageNumber: number,
    filter: string,
    email: string,
  ): Promise<IProvider[]> {
    const clients = await this.providerModel
      .find({ name: { $regex: filter, $options: 'i' }, email: email })
      .sort({ name: 1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
      .limit(10);
    if (!clients || clients.length == 0) {
      return []
    }
    return clients;
  }
  async get(SystemId: string): Promise<IProvider> {
    const data = await this.providerModel.findById(SystemId).exec();
    if (!data) {
      throw new NotFoundException(`Cliente #${SystemId} no encontrado`);
    }
    return data;
  }

  async delete(id: string): Promise<IProvider> {
    const result = await this.providerModel.findByIdAndDelete(id);
  
    return result;
  }
}
