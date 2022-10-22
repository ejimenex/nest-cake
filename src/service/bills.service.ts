import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillsDto } from 'src/Dto/BillsDto';
import { IBills } from 'src/interface/IBills';
@Injectable()
export class BillsService {
  constructor(@InjectModel('bills') private billModel: Model<IBills>) {}

  async create(BillsDto: BillsDto): Promise<IBills> {
  
    const newBill = await new this.billModel(BillsDto);
    return newBill.save();
  }
  async update(id: string, BillsDto: BillsDto): Promise<IBills> {
    const data = await this.billModel.findByIdAndUpdate(id, BillsDto, {
      new: false,
    });
    if (!data) {
      throw new NotFoundException(`notExist`);
    }
    return data;
  }
  async getAll(email:string): Promise<IBills[]> {
    const service = await this.billModel.find({email:email}).sort({ name: 1 });
    if (!service || service.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return service;
  }
  async getAllPaged(
    pageNumber: number,
    dateFrom: string,
    dateTo:string,
    email: string,
  ): Promise<IBills[]> {
    const bill = await this.billModel
      .find({ date: { $gte:dateFrom,$lte:dateTo }, email: email })
      .sort({ date: -1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
      .limit(10);
    if (!bill || bill.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return bill;
  }
  async get(SystemId: string): Promise<IBills> {
    const bill = await this.billModel.findById(SystemId).exec();
    if (!bill) {
      throw new NotFoundException(`notExist`);
    }
    return bill;
  }

  async delete(id: string): Promise<IBills> {
    const deletedBill= await this.billModel.findByIdAndDelete(id);
    if (!deletedBill) {
      throw new NotFoundException(`notExist`);
    }
    return deletedBill;
  }
}
