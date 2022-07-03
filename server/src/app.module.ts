import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductsModule} from "./products/products.module";
import { OptionsModule } from './options/options.module';
import { FiltersModule } from './filters/filters.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://aimparts:aimparts123@cluster0.s6zje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    UsersModule,
    ProductsModule,
    OptionsModule,
    FiltersModule,
    OrdersModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
