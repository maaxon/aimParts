import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import * as mongoose from "mongoose";
import {Option} from "../../options/schema/option.schema";
import {Category} from "../../categories/schema/category.schema";

export type FilterDocument = Filter & Document

@Schema()
export class Filter {
    @Prop()
    title: string

    @Prop({default:'checkbox'})
    type:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }] })
    options:Option[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    categories:Category[]
}

export const FilterSchema = SchemaFactory.createForClass(Filter)
