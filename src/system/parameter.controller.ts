import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ParameterService } from '../service/parameter.service';

import { ParameterDto } from '../Dto/ParameterDto';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('parameter')

export class ParameterController {
    constructor(private readonly parameterService:ParameterService){}
    
    
@Put('/:id')
async update(@Res() response,@Param('id') id: string,
@Body() ParameterDto: ParameterDto) {
  try {
   const param = await this.parameterService.update(id, ParameterDto);
  return response.status(HttpStatus.OK).json({
  param});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
    @Post()
    async create(@Res() response, @Body() dto: ParameterDto) {
   try {
     const param = await this.parameterService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     param});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message:  err.message,
     error: 'Bad Request'
  });
  }
 }
 @Get('/:id')
async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const data = await
this.parameterService.get(id);
    return response.status(HttpStatus.OK).json({
   data});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}


 }
