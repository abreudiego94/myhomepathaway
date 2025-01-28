import { Test, TestingModule } from '@nestjs/testing';
import { CensusController } from './census.controller';

describe('CensusController', () => {
  let controller: CensusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CensusController],
    }).compile();

    controller = module.get<CensusController>(CensusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
