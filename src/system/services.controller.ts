import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ServicesService } from '../service/services.service';

import { ServiceDto } from '../Dto/servicesDto';

import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('services')


export class ServicesController {
    constructor(private readonly serviceService:ServicesService){

    }
    
 
    
 
@Put('/:id')
async update(@Res() response,@Param('id') id: string,
@Body() ServiceDto: ServiceDto) {
  try {
   const existingServices = await this.serviceService.update(id, ServiceDto);
  return response.status(HttpStatus.OK).json({
  message: 'Servicio editado exitosamente!',
  existingServices,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

    @Post()
    async create(@Res() response, @Body() dto: ServiceDto) {
   try {
     const newService = await this.serviceService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     message: 'Servicio creado exitosamente',
     newService,});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: Servicio no pudo ser creado!' + err.message,
     error: 'Bad Request'
  });
  }
 }
 

 @Delete('/:id')
async delete(@Res() response, @Param('id') id: string)
{
  try {
    const deletedService = await this.serviceService.delete(id);
    return response.status(HttpStatus.OK).json({
    message: 'Servicio eliminado con exito',
    deletedService,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}

 @Get('/:id')

async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const existingService = await
this.serviceService.get(id);
    return response.status(HttpStatus.OK).json({
    message: 'Servicio encontrado',existingService,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

 @Get('getAll/:email')
 async getService(@Res() response,@Param('email') email: string){
    try{
        const service=await this.serviceService.getAll(email);
        return response.status(HttpStatus.OK).json({
            message:`${service.length} servicios encontrados`,service
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }

 @Get("GetPaginated/Data")
 async getPaged(@Res() response,@Query('pageNumber') pageNumber: number,@Query ('filter')filter?:string,@Query ('email')email?:string){
    try{
        const service=await this.serviceService.getAllPaged(pageNumber,filter,email);
        return response.status(HttpStatus.OK).json({
            message:`${service.length} servicios encontrados`,service
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
