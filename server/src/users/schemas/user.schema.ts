import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import {Order} from "../../orders/schema/order.schema";
import * as mongoose from "mongoose";


export type UserDocument = User & Document;




@Schema()
export class User {
    @Prop({ required: true,unique:true })
    email:string

    @Prop({ required: true })
    password:string

    @Prop({ required: true })
    name:string

    @Prop({ required: true })
    surname:string

    @Prop({ required: true })
    address:string

    @Prop({default:'user'})
    role:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
    orders:Order[]
}


export const UserSchema = SchemaFactory.createForClass(User);