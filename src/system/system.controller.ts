import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { response } from 'express';
import { get } from 'http';

import { SystemsDto } from '../Dto/SystemsDto';
import { SystemService } from '../service/systems.service';
@Controller('system')


export class SystemController {
    constructor(private readonly systemService:SystemService){

    }
    
    @Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}


    @Post()
    async createSystem(@Res() response, @Body() dto: SystemsDto) {
   try {
     const newSystem = await this.systemService.createSystem(dto);
     return response.status(HttpStatus.CREATED).json({
     message: 'Ssytem has been created successfully',
     newSystem,});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: System not created!',
     error: 'Bad Request'
  });
  }
 }
 @Delete('/:id')
 
async deleteStudent(@Res() response, @Param('id') id: string)
{
  try {
    const deletedSystem = await this.systemService.deleteSystem(id);
    return response.status(HttpStatus.OK).json({
    message: 'System deleted successfully',
    deletedSystem,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}
 @Get('/:id')
async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const existingSystem = await
this.systemService.getSystem(id);
    return response.status(HttpStatus.OK).json({
    message: 'System found successfully',existingSystem,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
 @Get()
 async getSystems(@Res() response){
    try{
        const systemData=await this.systemService.getAllSystem();
        return response.status(HttpStatus.OK).json({
            message:`${systemData.length} systems found`,systemData
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
