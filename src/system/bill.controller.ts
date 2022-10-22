import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { BillsService } from '../service/bills.service';

import { BillsDto } from '../Dto/BillsDto';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('bill')

export class BillController {
    constructor(private readonly billService:BillsService){}
    
    
@Put('/:id')
async update(@Res() response,@Param('id') id: string,
@Body() BillsDto: BillsDto) {
  try {
   const existingClients = await this.billService.update(id, BillsDto);
  return response.status(HttpStatus.OK).json({
  existingClients,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
    @Post()
    async create(@Res() response, @Body() dto: BillsDto) {
   try {
     const newBill = await this.billService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     newBill});
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
    const data = await this.billService.delete(id);
    return response.status(HttpStatus.OK).json({
    data,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}
 @Get('/:id')
async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const data = await
this.billService.get(id);
    return response.status(HttpStatus.OK).json({
   data});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
 @Get('getAll/:email')
 async getService(@Res() response,@Param('email') email: string){
    try{
        const data=await this.billService.getAll(email);
        return response.status(HttpStatus.OK).json({
           data
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }

 @Get("GetPaginated/Data")
 
 async getPaged(@Res() response,@Query('pageNumber') pageNumber: number,@Query ('dateFrom')dateFrom?:string,@Query ('dateTo')dateTo?:string,@Query ('email') email?:string){
    try{
        const bill=await this.billService.getAllPaged(pageNumber,dateFrom,dateTo,email);
        return response.status(HttpStatus.OK).json({bill
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
