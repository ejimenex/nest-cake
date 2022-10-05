import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { UnitOfMeasureService } from '../service/unitOfMeasure.service';

import { UnitOfMeasureDto } from '../Dto/UnitOfMeasureDto';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('unitofmeasure')


export class UnitOfMeasureController {
    constructor(private readonly uomService:UnitOfMeasureService){

    }
    @Post()
    async create(@Res() response, @Body() dto: UnitOfMeasureDto) {
   try {
     const newUoM = await this.uomService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     message: 'Unidad Creada con exito!',
     newUoM,});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: No se pudo crear la unidad!',
     error: 'Bad Request'
  });
  }
 }
 
 @Get()
 async get(@Res() response){
    try{
        const uomData=await this.uomService.getAll();
        return response.status(HttpStatus.OK).json({
            message:`${uomData.length} unidad no encontrada`,uomData
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
