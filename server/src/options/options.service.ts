import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Option,OptionDocument} from "./schema/option.schema";
import {CreateOptionDto} from "./dto/create-option.dto";
import {UpdateOptionDto} from "./dto/update-option.dto";
import mongoose from "mongoose";


@Injectable()
export class OptionsService {
    constructor(@InjectModel(Option.name) private optionModel: Model<OptionDocument>) {
    }

    async getAll(): Promise<Option[]> {
        return this.optionModel.find().populate('filter')
    }

    async getById(id: string): Promise<Option> {
        return this.optionModel.findById(id).populate('filter')
    }

    async create(productDto: CreateOptionDto): Promise<Option> {
        const newProduct = new this.optionModel(productDto)
        return newProduct.save()
    }

    async remove(id: string): Promise<Option> {
        return this.optionModel.findByIdAndRemove(id)
    }

    async update(id: string, productDto: UpdateOptionDto): Promise<Option> {
        return this.optionModel.findByIdAndUpdate(id, productDto, {new: true})
    }
    async updateOptionsFilter(options_ids:string[],newFilter:string ): Promise<void> {
       await this.optionModel.updateMany({_id:{$in:options_ids}},{filter:newFilter})
    }
}
