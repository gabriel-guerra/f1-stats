import { Module } from '@nestjs/common';
import { LapTimesService } from './lap_times.service';
import { LapTimesController } from './lap_times.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LapTime, LapTimeSchema } from './entities/lap_time.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: LapTime.name, schema: LapTimeSchema}])],
  controllers: [LapTimesController],
  providers: [LapTimesService],
})
export class LapTimesModule {}
