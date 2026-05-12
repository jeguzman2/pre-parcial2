import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(
    private readonly travelPlansService: TravelPlansService,
  ) {}

  @Post()
  async create(
    @Body() createTravelPlanDto: CreateTravelPlanDto,
  ) {
    return await this.travelPlansService.create(
      createTravelPlanDto,
    );
  }

  @Get()
  async findAll() {
    return await this.travelPlansService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.travelPlansService.findOne(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.travelPlansService.remove(id);

    return {
      message: `Travel plan with ID ${id} deleted successfully`,
    };
  }
}