import { Module} from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Filter, FilterSchema} from "./schema/filter.schema";
import {OptionsModule} from "../options/options.module";

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports:[MongooseModule.forFeature(
      [{name: Filter.name, schema: FilterSchema},]),
              OptionsModule]
})
export class FiltersModule {}


