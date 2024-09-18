import { Injectable } from '@nestjs/common';
import { CreateSprintResultDto } from './dto/create-sprint_result.dto';
import { UpdateSprintResultDto } from './dto/update-sprint_result.dto';

@Injectable()
export class SprintResultsService {
  create(createSprintResultDto: CreateSprintResultDto) {
    return 'This action adds a new sprintResult';
  }

  findAll() {
    return `This action returns all sprintResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sprintResult`;
  }

  update(id: number, updateSprintResultDto: UpdateSprintResultDto) {
    return `This action updates a #${id} sprintResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} sprintResult`;
  }
}
