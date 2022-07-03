import {forwardRef, Module} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "./schema/order.schema";
import {User, UserSchema} from "../users/schemas/user.schema";


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema},{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    OrdersService
  ]
})

export class OrdersModule {}
