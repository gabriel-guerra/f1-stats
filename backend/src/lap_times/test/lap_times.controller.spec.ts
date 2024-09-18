import { Test, TestingModule } from '@nestjs/testing';
import { LapTimesController } from '../lap_times.controller';
import { LapTimesService } from '../lap_times.service';

describe('LapTimesController', () => {
  let controller: LapTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapTimesController],
      providers: [LapTimesService],
    }).compile();

    controller = module.get<LapTimesController>(LapTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
