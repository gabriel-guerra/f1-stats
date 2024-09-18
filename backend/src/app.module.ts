import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstructorsModule } from './constructors/constructors.module';
import { ConfigModule } from '@nestjs/config';
import { CircuitsModule } from './circuits/circuits.module';
import { ConstructorResultsModule } from './constructor_results/constructor_results.module';
import { ConstructorStandingsModule } from './constructor_standings/constructor_standings.module';
import { DriverStandingsModule } from './driver_standings/driver_standings.module';
import { DriversModule } from './drivers/drivers.module';
import { LapTimesModule } from './lap_times/lap_times.module';
import { PitStopsModule } from './pit_stops/pit_stops.module';
import { QualifyingModule } from './qualifying/qualifying.module';
import { RacesModule } from './races/races.module';
import { ResultsModule } from './results/results.module';
import { SeasonsModule } from './seasons/seasons.module';
import { SprintResultsModule } from './sprint_results/sprint_results.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `./config/env/.${process.env.NODE_ENV}.env`, isGlobal: true}),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@0.0.0.0:${process.env.DB_PORT}`, 
      {dbName: `f1-stats-${process.env.ENV_LOWER}`}
    ), 
    ConstructorsModule, CircuitsModule, ConstructorResultsModule, ConstructorStandingsModule, DriverStandingsModule, DriversModule, LapTimesModule, PitStopsModule, QualifyingModule, RacesModule, ResultsModule, SeasonsModule, SprintResultsModule, StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
