import { Module } from '@nestjs/common';
import { CensusController } from './census.controller';
import { CensusService } from './census.service';

@Module({
  providers: [CensusService],
  controllers: [CensusController]
})
export class CensusModule {}
