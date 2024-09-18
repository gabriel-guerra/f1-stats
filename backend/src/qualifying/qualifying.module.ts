import { Module } from '@nestjs/common';
import { QualifyingService } from './qualifying.service';
import { QualifyingController } from './qualifying.controller';

@Module({
  controllers: [QualifyingController],
  providers: [QualifyingService],
})
export class QualifyingModule {}
