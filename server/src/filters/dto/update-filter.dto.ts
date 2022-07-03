import {Category} from "../../categories/schema/category.schema";

export class UpdateFilterDto {
    title:string
    type:string
    options:string[]
    categories:Category[]
}
