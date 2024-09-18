import { Test, TestingModule } from '@nestjs/testing';
import { PitStopsService } from './pit_stops.service';

describe('PitStopsService', () => {
  let service: PitStopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PitStopsService],
    }).compile();

    service = module.get<PitStopsService>(PitStopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
