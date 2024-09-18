import { Injectable } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { Circuit } from './entities/circuit.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CircuitsService {
  constructor(@InjectModel(Circuit.name) private readonly circuitModel: Model<Circuit>) {}
  
  async create(createCircuitDto: CreateCircuitDto) {
    try{
      return await this.circuitModel.create(createCircuitDto);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try{
      return await this.circuitModel.find().exec();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async findById(id: string) {
    try{
      return await this.circuitModel.findById(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateCircuitDto: UpdateCircuitDto) {
    try{
      return await this.circuitModel.findByIdAndUpdate(id, updateCircuitDto, {new: true});
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try{
      return await this.circuitModel.findByIdAndDelete(id);
    }catch(e){
      console.log(e);
      return null;
    }
  }
}
