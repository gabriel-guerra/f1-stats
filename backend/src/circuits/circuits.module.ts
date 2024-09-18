import { Module } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Circuit, CircuitSchema } from './entities/circuit.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Circuit.name, schema: CircuitSchema}])],
  controllers: [CircuitsController],
  providers: [CircuitsService],
})
export class CircuitsModule {}
