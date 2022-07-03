import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
} from '@nestjs/common';
import {OptionsService} from "./options.service";
import {Option} from "./schema/option.schema";
import {CreateOptionDto} from "./dto/create-option.dto";
import {UpdateOptionDto} from "./dto/update-option.dto";
import * as mongoose from "mongoose";

class optionIds {
    optionsIds:string[]
}

@Controller('options')
export class OptionsController {

    constructor(private readonly optionsService: OptionsService) {
    }


    @Get()
    getAll(): Promise<Option[]> {
        return this.optionsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Option> {
        return this.optionsService.getById(id)
    }

    @Post()
    create(@Body() createOptionDto: CreateOptionDto): Promise<Option> {
        return this.optionsService.create(createOptionDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Option> {
        return this.optionsService.remove(id)
    }

    @Patch(':id')
    update(@Body() updateOptionDto: UpdateOptionDto, @Param('id') id: string): Promise<Option> {
        return this.optionsService.update(id, updateOptionDto)
    }

}
