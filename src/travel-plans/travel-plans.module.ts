import { Module } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';

@Module({
  providers: [TravelPlansService],
  controllers: [TravelPlansController]
})
export class TravelPlansModule {}
