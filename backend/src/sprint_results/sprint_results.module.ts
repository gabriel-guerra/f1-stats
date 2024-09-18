import { Module } from '@nestjs/common';
import { SprintResultsService } from './sprint_results.service';
import { SprintResultsController } from './sprint_results.controller';

@Module({
  controllers: [SprintResultsController],
  providers: [SprintResultsService],
})
export class SprintResultsModule {}
