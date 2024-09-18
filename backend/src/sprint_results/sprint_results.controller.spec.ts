import { Test, TestingModule } from '@nestjs/testing';
import { SprintResultsController } from './sprint_results.controller';
import { SprintResultsService } from './sprint_results.service';

describe('SprintResultsController', () => {
  let controller: SprintResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintResultsController],
      providers: [SprintResultsService],
    }).compile();

    controller = module.get<SprintResultsController>(SprintResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
