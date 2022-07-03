import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateProductDto} from './dto/create-product.dto';
import {Product, ProductDocument} from './schemas/product.schema';
import {UpdateProductDto} from './dto/update-product.dto';



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
  async getByCategory(category_id:string,limit:number): Promise<Product[]>{
    return this.productModel.find({category:category_id}).limit(limit)
  }
}