import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Order, OrderDocument} from "./schema/order.schema";
import {User, UserDocument} from "../users/schemas/user.schema";

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
              @InjectModel(User.name) private userModel: Model<UserDocument>,) {}

  async getAll(limit:number): Promise<Order[]> {
    return( this.orderModel.find().limit(limit).populate('user').populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product'
      }
    })
  )
  }

  async getById(id: string): Promise<Order> {
    return (this.orderModel.findById(id).populate({
          path: 'products',
          populate: {
            path: 'product',
            model: 'Product'
          }
        })
    )
  }

  async create(orderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(orderDto)
    await this.userModel.findByIdAndUpdate(orderDto.user,{$push:{orders:newOrder.id}})
    return newOrder.save()
  }

  async remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove(id)
  }

  async removeByIds(ids:string[]):Promise<void>{
    await this.orderModel.findByIdAndRemove({$in:ids})
  }

  async getByUserId(id:string):Promise<Order[]>{
    return this.orderModel.find({user:id}).populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product'
      }
    }).populate("user");
  }

  async update(id: string, orderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, orderDto, {new: true})
  }
}
