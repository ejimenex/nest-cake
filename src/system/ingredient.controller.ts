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
import { IngredientDto } from '../Dto/IngredientDto';
import { IngredientService } from '../service/ingredientService';
import { JwtAuthGuard } from '../service/auth/jwt.auth.guard';
//@UseGuards(JwtAuthGuard)
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() ingredientDto: IngredientDto,
  ) {
    try {
      const existingIngredient = await this.ingredientService.update(
        id,
        ingredientDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Producto editado exitosamente!',
        existingIngredient,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async create(@Res() response, @Body() dto: IngredientDto) {
    try {
      const newIngredient = await this.ingredientService.create(dto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Producto creado exitosamente',
        newIngredient,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Producto no pudo ser creado!' + err.message,
        error: 'Bad Request',
      });
    }
  }
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deletedIngredient = await this.ingredientService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Ingrediente eliminado con exito',
        deletedIngredient,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getSystem(@Res() response, @Param('id') id: string) {
    try {
      const existingIngredient = await this.ingredientService.get(id);
      return response.status(HttpStatus.OK).json({
        message: 'Producto encontrado',
        existingIngredient,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('getAll/:email')
  async getIngredients(@Res() response, @Param('email') email: string) {
    try {
      const ingredients = await this.ingredientService.getAll(email);
      return response.status(HttpStatus.OK).json({
        message: `${ingredients.length} productos encontrados`,
        ingredients,
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
      const ingredients = await this.ingredientService.getAllPaged(
        pageNumber,
        filter,
        email,
      );
      return response.status(HttpStatus.OK).json({
        message: `${ingredients.length} productos encontrados`,
        ingredients,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
