import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ProviderService } from '../service/provider.service'

import { ProviderDto } from '../Dto/Provider';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('provider')

export class ProviderController {
    constructor(private readonly providerService:ProviderService){}
    
    
@Put('/:id')
async update(@Res() response,@Param('id') id: string,
@Body() ProviderDto: ProviderDto) {
  try {
   const data = await this.providerService.update(id, ProviderDto);
  return response.status(HttpStatus.OK).json({
  data,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
    @Post()
    async create(@Res() response, @Body() dto: ProviderDto) {
   try {
     const data = await this.providerService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     data,});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message:  err.message,
     error: 'Bad Request'
  });
  }
 }
 @Delete('/:id')
 
async delete(@Res() response, @Param('id') id: string)
{
  try {
    const result = await this.providerService.delete(id);
    return response.status(HttpStatus.OK).json({
    result});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}
 @Get('/:id')
async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const result = await
this.providerService.get(id);
    return response.status(HttpStatus.OK).json({
    result});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
 @Get('getAll/:email')
 async getService(@Res() response,@Param('email') email: string){
    try{
        const data=await this.providerService.getAll(email);
        return response.status(HttpStatus.OK).json({
           data
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }

 @Get("GetPaginated/Data")
 
 async getPaged(@Res() response,@Query('pageNumber') pageNumber: number,@Query ('filter')filter?:string,@Query ('email') email?:string){
    try{
        const data=await this.providerService.getAllPaged(pageNumber,filter,email);
        return response.status(HttpStatus.OK).json({data
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
