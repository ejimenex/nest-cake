import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AccountDto, AccountLoginDto } from '../Dto/AccountDto';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { LocalStrategy } from '../service/auth/local.strategy';
import { TestInterceptor } from 'src/service/testInterceptor';
@Controller('account')
@UseInterceptors(TestInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() AccountDto: AccountDto,
  ) {
    try {
      const existingClients = await this.accountService.update(id, AccountDto);
      return response.status(HttpStatus.NO_CONTENT).json({
        message: 'User editado exitosamente!',
        existingClients,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async create(@Res() response, @Body() dto: AccountDto) {
    try {
      const newService = await this.accountService.create(dto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User creado exitosamente',
        newService,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User no pudo ser creado!' + err.message,
        error: 'Bad Request',
      });
    }
  }
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deletedService = await this.accountService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'User eliminado con exito',
        deletedService,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('/GetOne')
  async getSystem(@Res() response, @Query('email') email) {
    try {
      const existingUser = await this.accountService.get(email);
      return response.status(HttpStatus.OK).json(existingUser);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @UseGuards(LocalStrategy)
  @Post('/Auth/Login')
  async login(
    @Res() response, @Body() dto: AccountLoginDto
  ) {
    try {
      const existingUser = await this.accountService.login(dto.userEmail,dto.password);
      return response.status(HttpStatus.OK).json(existingUser);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Res() response) {
    try {
      const service = await this.accountService.getAll();
      return response.status(HttpStatus.OK).json({
        message: `${service.length} user encontrados`,
        service,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    } 
  }
}
