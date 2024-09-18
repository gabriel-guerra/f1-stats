import { Injectable } from '@nestjs/common';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';
import { Constructor } from './entities/constructor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConstructorsService {
  constructor(@InjectModel(Constructor.name) private readonly constructorModel: Model<Constructor>) {}

  async create(createConstructorDto: CreateConstructorDto): Promise<Constructor>{
    try{
      return await this.constructorModel.create(createConstructorDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll(): Promise<Constructor[]> {
    try{
      return await this.constructorModel.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.constructorModel.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateConstructorDto: UpdateConstructorDto) {
    try{
      return await this.constructorModel.findByIdAndUpdate(id, updateConstructorDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.constructorModel.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
