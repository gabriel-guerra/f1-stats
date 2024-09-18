import { Test, TestingModule } from '@nestjs/testing';
import { QualifyingController } from './qualifying.controller';
import { QualifyingService } from './qualifying.service';

describe('QualifyingController', () => {
  let controller: QualifyingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualifyingController],
      providers: [QualifyingService],
    }).compile();

    controller = module.get<QualifyingController>(QualifyingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
