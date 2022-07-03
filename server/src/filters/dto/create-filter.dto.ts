import {Option} from "../../options/schema/option.schema";
import {Category} from "../../categories/schema/category.schema";

export class CreateFilterDto {
    title:string
    type:string
    options:Option[]
    categories:Category[]
}
