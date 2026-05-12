import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './entities/country.entity';
import { RestCountriesProvider } from './providers/rest-countries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    private readonly restCountriesProvider: RestCountriesProvider,
  ) {}

  async findByAlpha3Code(code: string): Promise<Country> {
    const upperCode = code.toUpperCase();

    // 1. Buscar en caché local (DB)
    const existingCountry = await this.countryRepository.findOne({
      where: {
        alpha3Code: upperCode,
      },
    });

    if (existingCountry) {
      console.log('Country found in local database');

      return existingCountry;
    }

    // 2. Buscar en API externa
    console.log('Fetching country from RestCountries API');

    const countryData =
      await this.restCountriesProvider.getCountryByCode(
        upperCode,
      );

    // 3. Guardar en DB
    const newCountry =
      this.countryRepository.create(countryData);

    return await this.countryRepository.save(newCountry);
  }
}
