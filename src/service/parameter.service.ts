import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { ParameterDto } from 'src/Dto/ParameterDto';
  import { IParameter } from 'src/interface/IParameter';
  @Injectable()
  export class ParameterService {
    constructor(@InjectModel('parameter') private parameterModel: Model<IParameter>) {}
  
    async create(ParameterDto: ParameterDto): Promise<IParameter> {
    
      const newBill = await new this.parameterModel(ParameterDto);
      return newBill.save();
    }
    async update(id: string, ParameterDto: ParameterDto): Promise<IParameter> {
      const data = await this.parameterModel.findByIdAndUpdate(id, ParameterDto, {
        new: false,
      });
      if (!data) {
        throw new NotFoundException(`notExist`);
      }
      return data;
    }

    async get(SystemId: string): Promise<IParameter> {
      const bill = await this.parameterModel.findById(SystemId).exec();
      if (!bill) {
        throw new NotFoundException(`notExist`);
      }
      return bill;
    }
  
 
  }
  