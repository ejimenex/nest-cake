import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDto } from 'src/Dto/AccountDto';
import { IAccount, IAccountForGet } from 'src/interface/IAccount';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel('account') private userModel: Model<IAccount>,@InjectModel('account') private userModelForGet: Model<IAccountForGet>,
    private jwtService: JwtService,
  ) {}

  async create(AccountDto: AccountDto): Promise<IAccount> {
    let exist = await this.userModel
      .find({ userEmail: AccountDto.userEmail })
      .exec();
    console.log(exist);
    if (exist.length > 0) {
      throw new BadRequestException('Ya existe este email');
    }
    AccountDto.password = await bcrypt.hash(AccountDto.password, 10);
    const newUser = await new this.userModel(AccountDto);
    return newUser.save();
  }
  async update(id: string, AccountDto: AccountDto): Promise<IAccount> {
    const data = await this.userModel.findByIdAndUpdate(id, AccountDto, {
      new: true,
    });
    if (!data) {
      throw new NotFoundException(`User #${id} no encontrado`);
    }
    return data;
  }

  async getAll(): Promise<IAccount[]> {
    const service = await this.userModel.find().sort({ name: 1 });
    if (!service || service.length == 0) {
      throw new NotFoundException('No hay data aun!');
    }
    return service;
  }

  async get(email: string): Promise<IAccountForGet> {
    const user = await this.userModelForGet.findOne({ userEmail: email }).exec();
    if (!user) {
    }
    return user;
  }
  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ userEmail: email }).exec();
    if (!user) {
      throw new NotFoundException('Wrong email');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new NotFoundException('Wrong credentials provided');
    }
    const payload = { email: user.userEmail, language: user.language,alias:user.alias,fullName:user.name + ' ' + user.lastName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async delete(id: string): Promise<IAccount> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} no encontrado`);
    }
    return deletedUser;
  }
}
