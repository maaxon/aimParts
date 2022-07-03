import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';



@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {
  }


  @Get(":limit")
  getAll(@Param("limit") limit:number): Promise<Product[]> {
    return this.productsService.getAll(limit)
  }
  @Post('ids')
  getByIds(@Body() ids:string[]): Promise<Product[]> {
    return this.productsService.getByIds(ids)
  }

  @Get('product/:id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }

  @Patch(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }
  @Get('category/:id/:limit')
  getByCategory(@Param('id') id: string,@Param('limit') limit:number): Promise<Product[]> {
    return this.productsService.getByCategory(id,limit)
  }
}
