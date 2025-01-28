import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CensusService {
  private readonly censusApiUrl = 'https://api.census.gov/data/2020/acs/acs5';
  private readonly apiKey = '888ead3fb3302c10fd3180d8098fe0777be7c2f9';
  private readonly fccApiUrl = 'https://geo.fcc.gov/api/census/block/find';

  async getCountyByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<string> {
    try {
      const response = await axios.get(this.fccApiUrl, {
        params: {
          format: 'json',
          latitude,
          longitude,
          censusYear: 2020,
        },
      });

      const countyFips = response.data.County?.FIPS;
      if (!countyFips) {
        throw new Error('Unable to retrieve the county FIPS code.');
      }
      return countyFips;
    } catch (error) {
    
      throw new Error('Error retrieving county information');
    }
  }

  async getIncomeData(lat: number, lng: number): Promise<any> {
    try {
     
      const countyFIPS = await this.getCountyByCoordinates(lat, lng);
      const stateCode = countyFIPS.slice(0, 2);
      const countyCode = countyFIPS.slice(2); 

      const response = await axios.get(this.censusApiUrl, {
        params: {
          get: 'B19013_001E', 
          for: `county:${countyCode}`,
          in: `state:${stateCode}`, 
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error retrieving Census API data');
    }
  }
}
