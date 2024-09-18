import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './entities/driver.schema';
import { Model } from 'mongoose';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private readonly driver: Model<Driver>) {}
  
  async create(createDriverDto: CreateDriverDto) {
    try{
      return await this.driver.create(createDriverDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.driver.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.driver.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try{
      return await this.driver.findByIdAndUpdate(id, updateDriverDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.driver.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
