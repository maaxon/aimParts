import {Filter} from "../../filters/schema/filter.schema";

export class CreateProductDto {
  title: string
  price: number
  img:string
  desc:string
  images:string[]
  filters:Filter[]
  text:string
}