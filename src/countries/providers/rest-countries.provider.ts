import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getCountryByCode(code: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://restcountries.com/v3.1/alpha/${code}`,
        ),
      );

      const country = response.data[0];

      return {
        alpha3Code: country.cca3,
        name: country.name.common,
        region: country.region,
        capital: country.capital?.[0] || 'Unknown',
        population: country.population,
        flagUrl: country.flags?.png || '',
      };
    } catch (error) {
      throw new NotFoundException(
        `Country with code ${code} not found`,
      );
    }
  }
}