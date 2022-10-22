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
import { ProviderSchema } from './schemas/provider';
import { InvoiceSchema } from './schemas/invoice';
import { InvoiceService } from './service/invoice.services';
import { InvoiceController } from './system/invoice.controller';
import { ProviderController } from './system/provider.controller';
import { ProviderService } from './service/provider.service';
import { BillsSchema } from './schemas/bills';
import { BillsService } from './service/bills.service';
import { BillController } from './system/bill.controller';
import { ParameterSchema } from './schemas/parameter';
import { ParameterService } from './service/parameter.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ApisMARDOM'),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90h' },
    }),
    MongooseModule.forFeature([
      { name: 'ApisMARDOM', schema: SystemsSchema },
      { name: 'unitOfMeasure', schema: UnitOfMeasureSchema },
      { name: 'ingredient', schema: IngredientsSchema },
      { name: 'service', schema: ServicesSchema },
      { name: 'client', schema: ClientSchema },
      { name: 'account', schema: AccountSchema },
      { name: 'orders', schema: OrderSchema },
      { name: 'inventoryIngredient', schema: InventoryIngredientSchema },
      { name: 'provider', schema: ProviderSchema },
      { name: 'invoice', schema: InvoiceSchema },
      { name: 'bills', schema: BillsSchema },
      {name:'parameter',schema:ParameterSchema}
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
    InventoryIngredientController,
    InvoiceController,
    ProviderController,
    BillController
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
    InvoiceService,
    BillsService,
    UnitOfMeasureService,
    IngredientService,
    ParameterService,
    ServicesService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    OrderService,
    InventoryIngredientService,
    ProviderService,
  ],
})
export class AppModule {}
