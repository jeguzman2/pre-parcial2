import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

import { CountriesService } from '../countries/countries.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository: Repository<TravelPlan>,

    private readonly countriesService: CountriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createTravelPlanDto: CreateTravelPlanDto,
  ): Promise<TravelPlan> {
    // Validar país usando caché/API externa
    await this.countriesService.findByAlpha3Code(
      createTravelPlanDto.destinationCountryCode,
    );

    
  const user = await this.usersService.findOne(
    createTravelPlanDto.userId,
  );

  if (!user) {
    throw new NotFoundException('el usuario no esta ');
  }

    const travelPlan = this.travelPlanRepository.create({
      ...createTravelPlanDto,
    });

    return await this.travelPlanRepository.save(
      travelPlan,
    );
  }

  async findAll(): Promise<TravelPlan[]> {
    return await this.travelPlanRepository.find();
  }

  async findOne(id: number): Promise<TravelPlan> {
    const travelPlan =
      await this.travelPlanRepository.findOne({
        where: { id },
      });

    if (!travelPlan) {
      throw new NotFoundException(
        `Travel plan with ID ${id} not found`,
      );
    }

    return travelPlan;
  }

  async remove(id: number): Promise<void> {
    const result = await this.travelPlanRepository.delete(
      id,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Travel plan with ID ${id} not found`,
      );
    }
  }

  async addExpense(id: number, expenseDto: CreateExpenseDto) {

  const travelPlan = await this.travelPlanRepository.findOne({
    where: { id },
  });

  if (!travelPlan) {
    throw new NotFoundException('Travel plan not found');
  }

  travelPlan.expenses.push(expenseDto);

  return this.travelPlanRepository.save(travelPlan);
}


}