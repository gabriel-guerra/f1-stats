import { Injectable } from '@nestjs/common';
import { CreateDriverStandingDto } from './dto/create-driver_standing.dto';
import { UpdateDriverStandingDto } from './dto/update-driver_standing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DriverStanding } from './entities/driver_standing.schema';
import { Model } from 'mongoose';

@Injectable()
export class DriverStandingsService {
  constructor(@InjectModel(DriverStanding.name) private readonly driverStanding: Model<DriverStanding>) {}
  
  async create(createDriverStandingDto: CreateDriverStandingDto) {
    try{
      return await this.driverStanding.create(createDriverStandingDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.driverStanding.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.driverStanding.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateDriverStandingDto: UpdateDriverStandingDto) {
    try{
      return await this.driverStanding.findByIdAndUpdate(id, updateDriverStandingDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.driverStanding.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
