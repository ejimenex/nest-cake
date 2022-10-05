import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemsDto } from 'src/Dto/SystemsDto';
import { ISystems } from 'src/interface/IApisMardom';
@Injectable()
export class SystemService {
  constructor(
    @InjectModel('ApisMARDOM') private systemModel: Model<ISystems>,
  ) {}
  async createSystem(systemDto: SystemsDto): Promise<ISystems> {
    const newSystem = await new this.systemModel(systemDto);
    return newSystem.save();
  }
  async updateSystem(id: string, systemDto: SystemsDto): Promise<ISystems> {
    const existingSystem = await this.systemModel.findByIdAndUpdate(
      id,
      systemDto,
      { new: true },
    );
    if (!existingSystem) {
      throw new NotFoundException(`System #${id} not found`);
    }
    return existingSystem;
  }
  async getAllSystem(): Promise<ISystems[]> {
    const SystemData = await this.systemModel.find().sort({ name: 1 });
    if (!SystemData || SystemData.length == 0) {
      throw new NotFoundException('Systems data not found!');
    }
    return SystemData;
  }
  async getSystem(SystemId: string): Promise<ISystems> {
    const existingSystem = await this.systemModel.findById(SystemId).exec();
    if (!existingSystem) {
      throw new NotFoundException(`System #${SystemId} not found`);
    }
    return existingSystem;
  }

  async deleteSystem(id: string): Promise<ISystems> {
    const deletedSystem = await this.systemModel.findByIdAndDelete(id);
    if (!deletedSystem) {
      throw new NotFoundException(`System #${id} not found`);
    }
    return deletedSystem;
  }
}
