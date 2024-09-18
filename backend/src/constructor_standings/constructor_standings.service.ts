import { Injectable } from '@nestjs/common';
import { CreateConstructorStandingDto } from './dto/create-constructor_standing.dto';
import { UpdateConstructorStandingDto } from './dto/update-constructor_standing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructorStanding } from './entities/constructor_standing.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConstructorStandingsService {
  constructor(@InjectModel(ConstructorStanding.name) private readonly constructorStanding: Model<ConstructorStanding>) {}

  async create(createConstructorStandingDto: CreateConstructorStandingDto) {
    try{
      return await this.constructorStanding.create(createConstructorStandingDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.constructorStanding.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.constructorStanding.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateConstructorStandingDto: UpdateConstructorStandingDto) {
    try{
      return await this.constructorStanding.findByIdAndUpdate(id, updateConstructorStandingDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.constructorStanding.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
