import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../products/schemas/product.schema";
import {Model} from "mongoose";
import {Category, CategoryDocument} from "./schema/category.schema";

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
  }

  create(createCategoryDto: CreateCategoryDto) {
    const newProduct = new this.categoryModel(createCategoryDto)
    return newProduct.save()
  }

  getAll(limit:number) {
    return this.categoryModel.find().limit(limit)
  }

  findOne(id: string) {
    return this.categoryModel.findById(id)
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id,updateCategoryDto,{new:true})
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndRemove(id)
  }
}
