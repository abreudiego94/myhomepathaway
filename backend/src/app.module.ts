import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CensusModule } from './census/census.module';

@Module({
  imports: [CensusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
