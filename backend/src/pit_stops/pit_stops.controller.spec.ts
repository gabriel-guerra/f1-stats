import { Test, TestingModule } from '@nestjs/testing';
import { PitStopsController } from './pit_stops.controller';
import { PitStopsService } from './pit_stops.service';

describe('PitStopsController', () => {
  let controller: PitStopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PitStopsController],
      providers: [PitStopsService],
    }).compile();

    controller = module.get<PitStopsController>(PitStopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
