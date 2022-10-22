import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { OrderService } from '../service/orders.services';

import { OrdersDto } from '../Dto/OrdersDto';

import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
import { InvoiceService } from '../service/invoice.services';
@UseGuards(JwtAuthGuard)
@Controller('invoice')


export class InvoiceController {
    constructor(private readonly serviceService:InvoiceService){

    }
        
 


    @Post()
    async create(@Res() response, @Body() dto: OrdersDto) {
   try {
     const data = await this.serviceService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     data});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message:  + err.message,
  });
  }
 }
 

 @Delete('/:id')
async delete(@Res() response, @Param('id') id: string)
{
  try {
    const data = await this.serviceService.delete(id);
    return response.status(HttpStatus.OK).json({
    data});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}

 @Get('/:id')

async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const data = await
this.serviceService.get(id);
    return response.status(HttpStatus.OK).json({
    data});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}



 @Get("GetPaginated/Data")
 async getPaged(@Res() response,@Query('pageNumber') pageNumber: number,@Query ('filter')filter?:string,@Query ('finished')finished?:boolean,@Query ('email')email?:string){
  finished=Boolean(finished)
    try{
        const data=await this.serviceService.getAllPaged(pageNumber,filter,email);
        return response.status(HttpStatus.OK).json({data});
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
