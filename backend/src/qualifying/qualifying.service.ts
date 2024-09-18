import { Injectable } from '@nestjs/common';
import { CreateQualifyingDto } from './dto/create-qualifying.dto';
import { UpdateQualifyingDto } from './dto/update-qualifying.dto';

@Injectable()
export class QualifyingService {
  create(createQualifyingDto: CreateQualifyingDto) {
    return 'This action adds a new qualifying';
  }

  findAll() {
    return `This action returns all qualifying`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qualifying`;
  }

  update(id: number, updateQualifyingDto: UpdateQualifyingDto) {
    return `This action updates a #${id} qualifying`;
  }

  remove(id: number) {
    return `This action removes a #${id} qualifying`;
  }
}
