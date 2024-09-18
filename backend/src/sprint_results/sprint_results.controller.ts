import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintResultsService } from './sprint_results.service';
import { CreateSprintResultDto } from './dto/create-sprint_result.dto';
import { UpdateSprintResultDto } from './dto/update-sprint_result.dto';

@Controller('sprint-results')
export class SprintResultsController {
  constructor(private readonly sprintResultsService: SprintResultsService) {}

  @Post()
  create(@Body() createSprintResultDto: CreateSprintResultDto) {
    return this.sprintResultsService.create(createSprintResultDto);
  }

  @Get()
  findAll() {
    return this.sprintResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sprintResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSprintResultDto: UpdateSprintResultDto) {
    return this.sprintResultsService.update(+id, updateSprintResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sprintResultsService.remove(+id);
  }
}
