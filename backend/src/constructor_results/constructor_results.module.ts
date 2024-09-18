import { Module } from '@nestjs/common';
import { ConstructorResultsService } from './constructor_results.service';
import { ConstructorResultsController } from './constructor_results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstructorResult, ConstructorResultSchema } from './entities/constructor_result.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: ConstructorResult.name, schema: ConstructorResultSchema}])],
  controllers: [ConstructorResultsController],
  providers: [ConstructorResultsService],
})
export class ConstructorResultsModule {}
