import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ClientService } from '../service/client.service';

import { ClientDto } from '../Dto/ClientDto';
import { LocalAuthGuard } from '../service/auth/local.auth.guard';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('client')

export class ClientController {
    constructor(private readonly clientService:ClientService){}
    
    
@Put('/:id')
async update(@Res() response,@Param('id') id: string,
@Body() ClientDto: ClientDto) {
  try {
   const existingClients = await this.clientService.update(id, ClientDto);
  return response.status(HttpStatus.OK).json({
  message: 'Cliente editado exitosamente!',
  existingClients,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
    @Post()
    async create(@Res() response, @Body() dto: ClientDto) {
   try {
     const newService = await this.clientService.create(dto);
     return response.status(HttpStatus.CREATED).json({
     message: 'Cliente creado exitosamente',
     newService,});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: Cliente no pudo ser creado!' + err.message,
     error: 'Bad Request'
  });
  }
 }
 @Delete('/:id')
 
async delete(@Res() response, @Param('id') id: string)
{
  try {
    const deletedService = await this.clientService.delete(id);
    return response.status(HttpStatus.OK).json({
    message: 'Cliente eliminado con exito',
    deletedService,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  
}}
 @Get('/:id')
async getSystem(@Res() response, @Param('id') id: string) {
 try {
    const existingClient = await
this.clientService.get(id);
    return response.status(HttpStatus.OK).json({
    message: 'Cliente encontrado',existingClient,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
 @Get('getAll/:email')
 async getService(@Res() response,@Param('email') email: string){
    try{
        const data=await this.clientService.getAll(email);
        return response.status(HttpStatus.OK).json({
           data
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }

 @Get("GetPaginated/Data")
 
 async getPaged(@Res() response,@Query('pageNumber') pageNumber: number,@Query ('filter')filter?:string,@Query ('email') email?:string){
    try{
        const clients=await this.clientService.getAllPaged(pageNumber,filter,email);
        return response.status(HttpStatus.OK).json({
            message:`${clients.length} clientes encontrados`,clients
        });
    }catch(err){return response.status(err.status).json(err.response)}
 }
}
