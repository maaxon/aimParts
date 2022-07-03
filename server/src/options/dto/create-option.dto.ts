import {Filter} from "../../filters/schema/filter.schema";

export class CreateOptionDto {
    title:string
    value:string
    filter:Filter
}