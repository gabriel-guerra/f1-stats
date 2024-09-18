import { Injectable } from '@nestjs/common';
import { CreateConstructorResultDto } from './dto/create-constructor_result.dto';
import { UpdateConstructorResultDto } from './dto/update-constructor_result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructorResult } from './entities/constructor_result.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConstructorResultsService {
  constructor(@InjectModel(ConstructorResult.name) private readonly constructorResultModel: Model<ConstructorResult>) {}

  async create(createConstructorResultDto: CreateConstructorResultDto) {
    try{
      return await this.constructorResultModel.create(createConstructorResultDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.constructorResultModel.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.constructorResultModel.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateConstructorResultDto: UpdateConstructorResultDto) {
    try{
      return await this.constructorResultModel.findByIdAndUpdate(id, updateConstructorResultDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.constructorResultModel.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
