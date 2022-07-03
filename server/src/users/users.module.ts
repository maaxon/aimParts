import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User,UserSchema} from "./schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {OrdersModule} from "../orders/orders.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(()=>OrdersModule)
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
