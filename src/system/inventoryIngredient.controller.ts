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

import { InventoryIngredientService } from '../service/inventoryIngredient.service';

import { inventoryIngredientDto } from '../Dto/inventoryIngredientDto';

import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
//@UseGuards(JwtAuthGuard)
@Controller('InventoryIngredient')
export class InventoryIngredientController {
  constructor(
    private readonly inventoryIngredientService: InventoryIngredientService,
  ) {}

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() inventoryIngredientDto: inventoryIngredientDto,
  ) {
    try {
     const data= await this.inventoryIngredientService.update(id, inventoryIngredientDto);
      return response.status(HttpStatus.NO_CONTENT).json({data});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async create(@Res() response, @Body() dto: inventoryIngredientDto) {
    try {
      const newService = await this.inventoryIngredientService.create(dto);
      return response.status(HttpStatus.CREATED).json({
        newService,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message:  err.message,
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deletedService = await this.inventoryIngredientService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Servicio eliminado con exito',
        deletedService,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getSystem(@Res() response, @Param('id') id: string) {
    try {
      const existingService = await this.inventoryIngredientService.get(id);
      return response.status(HttpStatus.OK).json({
        message: 'Servicio encontrado',
        existingService,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('getAll/:id')
  async getService(@Res() response, @Param('email') email: string) {
    try {
      const service = await this.inventoryIngredientService.getAll(email);
      return response.status(HttpStatus.OK).json({
        message: `${service.length} servicios encontrados`,
        service,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('GetPaginated/Data')
  async getPaged(
    @Res() response,
    @Query('pageNumber') pageNumber: number,
    @Query('filter') filter?: string,
    @Query('email') email?: string,
  ) {
    try {
      const inventory = await this.inventoryIngredientService.getAllPaged(
        pageNumber,
        filter,
        email,
      );
      return response.status(HttpStatus.OK).json({      
        inventory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
