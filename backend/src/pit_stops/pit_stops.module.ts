import { Module } from '@nestjs/common';
import { PitStopsService } from './pit_stops.service';
import { PitStopsController } from './pit_stops.controller';

@Module({
  controllers: [PitStopsController],
  providers: [PitStopsService],
})
export class PitStopsModule {}
