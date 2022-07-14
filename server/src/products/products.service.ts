import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateProductDto} from './dto/create-product.dto';
import {Product, ProductDocument} from './schemas/product.schema';
import {UpdateProductDto} from './dto/update-product.dto';
import {AppFilter} from "./dto/AppFilter";



@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  }

  async getAll(limit:number): Promise<Product[]> {
    return this.productModel.find().limit(limit)
  }

  async getByIds(ids:string[]): Promise<Product[]> {
    return this.productModel.find({_id:{$in:ids}})
  }


  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id).populate({
      path: 'options',
      populate: {
        path: 'filter',
        model: 'Filter'
      }
    })
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
  async getByCategory(category_id:string,limit:number,filters:AppFilter[]): Promise<Product[]>{

    let empty=true
    filters.forEach(filter=>{
      if (empty) empty=filter.options.length<1
    })

    if (!empty){

      const selector = filters.reduce((results, filter) => {
        if (filter.options.length>0) results.push({options:{$in:filter.options}})
        return results
      }, [])
      return this.productModel.find({category:category_id}).and(selector).limit(limit)
    }
    return this.productModel.find({category:category_id}).limit(limit)
  }



}