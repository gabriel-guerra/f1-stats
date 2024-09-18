import { Injectable } from '@nestjs/common';
import { CreatePitStopDto } from './dto/create-pit_stop.dto';
import { UpdatePitStopDto } from './dto/update-pit_stop.dto';

@Injectable()
export class PitStopsService {
  create(createPitStopDto: CreatePitStopDto) {
    return 'This action adds a new pitStop';
  }

  findAll() {
    return `This action returns all pitStops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pitStop`;
  }

  update(id: number, updatePitStopDto: UpdatePitStopDto) {
    return `This action updates a #${id} pitStop`;
  }

  remove(id: number) {
    return `This action removes a #${id} pitStop`;
  }
}
