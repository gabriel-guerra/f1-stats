import { Module } from '@nestjs/common';
import { DriverStandingsService } from './driver_standings.service';
import { DriverStandingsController } from './driver_standings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverStanding, DriverStandingSchema } from './entities/driver_standing.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: DriverStanding.name, schema: DriverStandingSchema}])],
  controllers: [DriverStandingsController],
  providers: [DriverStandingsService],
})
export class DriverStandingsModule {}
