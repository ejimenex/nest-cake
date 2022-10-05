import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDto } from 'src/Dto/ClientDto';
import { IClient } from 'src/interface/IClient';
@Injectable()
export class ClientService {
  constructor(@InjectModel('client') private clientModel: Model<IClient>) {}

  async create(ClientDto: ClientDto): Promise<IClient> {
    let exist = this.clientModel.find({
      name: ClientDto.name,
      email: ClientDto.email,
    });
    console.log(exist);
    if ((await exist).length > 0) {
      throw new BadRequestException('Ya existe este cliente');
    }
    const newClient = await new this.clientModel(ClientDto);
    return newClient.save();
  }
  async update(id: string, ClientDto: ClientDto): Promise<IClient> {
    const data = await this.clientModel.findByIdAndUpdate(id, ClientDto, {
      new: false,
    });
    if (!data) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    return data;
  }
  async getAll(email:string): Promise<IClient[]> {
    const service = await this.clientModel.find({email:email}).sort({ name: 1 });
    if (!service || service.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return service;
  }
  async getAllPaged(
    pageNumber: number,
    filter: string,
    email: string,
  ): Promise<IClient[]> {
    const clients = await this.clientModel
      .find({ name: { $regex: filter, $options: 'i' }, email: email })
      .sort({ name: 1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
      .limit(10);
    if (!clients || clients.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return clients;
  }
  async get(SystemId: string): Promise<IClient> {
    const clients = await this.clientModel.findById(SystemId).exec();
    if (!clients) {
      throw new NotFoundException(`Cliente #${SystemId} no encontrado`);
    }
    return clients;
  }

  async delete(id: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id);
    if (!deletedClient) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    return deletedClient;
  }
}
