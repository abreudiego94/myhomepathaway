import { Controller, Get, Query } from '@nestjs/common';
import { CensusService } from './census.service';
import FIPSCode from 'src/utils/consts';

@Controller('census')
export class CensusController {
  constructor(private readonly censusService: CensusService) {}

  @Get()
  async getIncomeData(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    try {
      var data = await this.censusService.getIncomeData(lat, lng);
      const incomeData = data[1][0];
      return {
        income: incomeData,
      };
    } catch (e) {}
  }
}
