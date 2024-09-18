import { Injectable } from '@nestjs/common';
import { CreateLapTimeDto } from './dto/create-lap_time.dto';
import { UpdateLapTimeDto } from './dto/update-lap_time.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LapTime } from './entities/lap_time.schema';
import { Model } from 'mongoose';

@Injectable()
export class LapTimesService {
  constructor(@InjectModel(LapTime.name) private readonly lapTime: Model<LapTime>) {}
  
  async create(createLapTimeDto: CreateLapTimeDto) {
    try{
      return await this.lapTime.create(createLapTimeDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.lapTime.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.lapTime.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateLapTimeDto: UpdateLapTimeDto) {
    try{
      return await this.lapTime.findByIdAndUpdate(id, updateLapTimeDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.lapTime.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
