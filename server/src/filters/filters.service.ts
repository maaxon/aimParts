import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Filter, FilterDocument} from "./schema/filter.schema";
import {OptionsService} from "../options/options.service";


@Injectable()
export class FiltersService {
  constructor(@InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
              private optionsService: OptionsService) {
  }

  async getAll(limit:number): Promise<Filter[]> {
    return this.filterModel.find().limit(limit).populate('options').populate("categories")
  }

  async getById(id: string): Promise<Filter> {
    return this.filterModel.findById(id).populate('options')
  }

  async create(filterDto: CreateFilterDto): Promise<Filter> {
    const newProduct = new this.filterModel(filterDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Filter> {
    return this.filterModel.findByIdAndRemove(id)
  }

  async update(id: string, filterDto: UpdateFilterDto): Promise<Filter>{
    if (filterDto.options) await this.optionsService.updateOptionsFilter(filterDto.options,id);console.log("eeee")
    return this.filterModel.findByIdAndUpdate(id, filterDto, {new: true})
  }
  async getByCategory(category_id:string): Promise<Filter[]>{
    return this.filterModel.find({categories:category_id}).populate('options')
  }
}
