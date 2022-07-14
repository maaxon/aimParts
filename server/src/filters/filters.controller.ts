import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  create(@Body() createFilterDto: CreateFilterDto) {
    return this.filtersService.create(createFilterDto);
  }

  @Get(":limit")
  findAll(@Param('limit') limit: number) {
    return this.filtersService.getAll(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filtersService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilterDto: UpdateFilterDto) {
    return this.filtersService.update(id, updateFilterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filtersService.remove(id);
  }
  @Get('/category/:id')
  getByCategory(@Param('id') id: string){
    return this.filtersService.getByCategory(id)
  }
}
