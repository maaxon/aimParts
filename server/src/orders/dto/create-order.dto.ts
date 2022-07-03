import {User} from "../../users/schemas/user.schema";
import {IProducts} from "../schema/order.schema";

export class CreateOrderDto {
    user:string
    price:number
    products:IProducts
}
