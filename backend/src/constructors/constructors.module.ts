import { Module } from '@nestjs/common';
import { ConstructorsService } from './constructors.service';
import { ConstructorsController } from './constructors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Constructor, ConstructorSchema } from './entities/constructor.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Constructor.name, schema: ConstructorSchema}])],
  controllers: [ConstructorsController],
  providers: [ConstructorsService],
  exports: [ConstructorsService],
})
export class ConstructorsModule {}
