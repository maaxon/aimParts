import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import { Model} from "mongoose"
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {OrdersService} from "../orders/orders.service";



@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private OrdersService:OrdersService) {
    }

    async getAll(): Promise<User[]>{
        return this.userModel.find()
    }

    async getById(id: string): Promise<User> {
        return this.userModel.findById(id)
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async remove(id: string): Promise<void> {
        const userData:CreateUserDto = await this.userModel.findByIdAndRemove(id)
        await this.OrdersService.removeByIds(userData.orders)
    }

    async update(id: string, userDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, {new: true})
    }

    async getUserByEmail(email:string):Promise<User> {
        return this.userModel.findOne({email})
    }

    async addOrder(order_id:string,id:string):Promise<void>{
        await this.userModel.findByIdAndUpdate(id,{$push:{orders:order_id}})
    }

}
