import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemsSchema } from './schemas/systems';
import { SystemService } from './service/systems.service';
import { SystemController } from './system/system.controller';
import { UnitOfMeasureService } from './service/unitOfMeasure.service';
import { UnitOfMeasureSchema } from './schemas/unitOfMeasure';
import { UnitOfMeasureController } from './system/unitOfMeasure.controller';
import { IngredientsSchema } from './schemas/ingredient';
import { IngredientService } from './service/ingredientService';
import { IngredientController } from './system/ingredient.controller';
import { ServicesSchema } from './schemas/services';
import { ServicesService } from './service/services.service';
import { ClientService } from './service/client.service';
import { ServicesController } from './system/services.controller';
import { ClientSchema } from './schemas/client';
import { ClientController } from './system/client.controller';
import { AccountController } from './system/account.controller';
import { AccountSchema } from './schemas/account';
import { AccountService } from './service/account.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/auth/local.strategy';
import { JwtStrategy } from './service/auth/jwt.strategy';
import { JwtAuthGuard } from './service/auth/jwt.auth.guard';
import { LocalAuthGuard } from './service/auth/local.auth.guard';
import { jwtConstants } from './constant/jwtSecret';
import { APP_GUARD } from '@nestjs/core';
import { InventoryIngredientSchema } from './schemas/inventoryIngredient';
import { InventoryIngredientService } from './service/inventoryIngredient.service';
import { InventoryIngredientController } from './system/inventoryIngredient.controller';
import { OrderSchema } from './schemas/orders';
import { OrderService } from './service/orders.services';
import { OrdersController } from './system/orders.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ApisMARDOM'),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forFeature([
      { name: 'ApisMARDOM', schema: SystemsSchema },
      { name: 'unitOfMeasure', schema: UnitOfMeasureSchema },
      { name: 'ingredient', schema: IngredientsSchema },
      { name: 'service', schema: ServicesSchema },
      { name: 'client', schema: ClientSchema },
      {name:'account',schema:AccountSchema},
      {name:'orders',schema:OrderSchema},
      {name:'inventoryIngredient',schema:InventoryIngredientSchema}
    ]),
  ],
  controllers: [
    AppController,
    ClientController,
    SystemController,
    UnitOfMeasureController,
    IngredientController,
    ServicesController,
    AccountController,
    OrdersController,
    InventoryIngredientController
  ],
  providers: [ 
    // {
   // provide: APP_GUARD,
    //useClass: JwtAuthGuard,
  //},
    AccountService,
    AppService,
    SystemService,
    ClientService,
    UnitOfMeasureService,
    IngredientService,
    ServicesService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    OrderService,
    InventoryIngredientService
  ]
})
export class AppModule {}
