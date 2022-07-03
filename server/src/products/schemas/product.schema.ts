import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import {Option} from "../../options/schema/option.schema";
import mongoose from "mongoose";
import {Category} from "../../categories/schema/category.schema";

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  title: string

  @Prop()
  price: number

  @Prop()
  img:string

  @Prop()
  desc:string

  @Prop()
  text:string

  @Prop()
  images:string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }] })
  options:Option[]

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Categories'})
  category:Category
}

export const ProductSchema = SchemaFactory.createForClass(Product)