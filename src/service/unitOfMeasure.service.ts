import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitOfMeasureDto } from 'src/Dto/UnitOfMeasureDto';
import { IUnitOfMeasure } from 'src/interface/IUnitOfMeasure';
@Injectable()
export class UnitOfMeasureService {
  constructor(
    @InjectModel('unitOfMeasure') private unitOfMeasuteModel: Model<IUnitOfMeasure>,
  ) {}
  async create(dto: UnitOfMeasureDto): Promise<IUnitOfMeasure> {
    const data = await new this.unitOfMeasuteModel(dto);
    return data.save();
  }

  async getAll(): Promise<IUnitOfMeasure[]> {
    const UoMData = await this.unitOfMeasuteModel.find().sort({ name: 1 });
    if (!UoMData || UoMData.length == 0) {
      throw new NotFoundException('Systems data not found!');
    }
    return UoMData;
  }
}
