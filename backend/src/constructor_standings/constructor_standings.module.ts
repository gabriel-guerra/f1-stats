import { Module } from '@nestjs/common';
import { ConstructorStandingsService } from './constructor_standings.service';
import { ConstructorStandingsController } from './constructor_standings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstructorStanding, ConstructorStandingSchema } from './entities/constructor_standing.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: ConstructorStanding.name, schema: ConstructorStandingSchema}])],
  controllers: [ConstructorStandingsController],
  providers: [ConstructorStandingsService],
})
export class ConstructorStandingsModule {}
