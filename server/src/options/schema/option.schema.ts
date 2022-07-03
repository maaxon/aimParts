import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import mongoose from "mongoose";
import {Filter} from "../../filters/schema/filter.schema";

export type OptionDocument = Option & Document

@Schema()
export class Option {
    @Prop()
    title: string


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Filter' })
    filter:Filter
}

export const OptionSchema = SchemaFactory.createForClass(Option)