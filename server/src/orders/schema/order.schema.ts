import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import {User} from "../../users/schemas/user.schema";
import * as mongoose from "mongoose";
import {Product} from "../../products/schemas/product.schema";

export type OrderDocument = Order & Document

export interface IProducts {
    product:Product,
    count:number
}

@Schema()
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop()
    total:number

    @Prop()
    products:IProducts[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
