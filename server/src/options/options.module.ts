import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Option, OptionSchema} from "./schema/option.schema";

@Module({
  controllers: [OptionsController],
  providers: [OptionsService],
  imports:[MongooseModule.forFeature([
    {name: Option.name, schema: OptionSchema}
  ])],
  exports:[OptionsService]
})
export class OptionsModule {}
