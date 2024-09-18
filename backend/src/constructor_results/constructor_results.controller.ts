import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConstructorResultsService } from './constructor_results.service';
import { CreateConstructorResultDto } from './dto/create-constructor_result.dto';
import { UpdateConstructorResultDto } from './dto/update-constructor_result.dto';

@Controller('constructor-results')
export class ConstructorResultsController {
  constructor(private readonly constructorResultsService: ConstructorResultsService) {}

  @Post()
  async create(@Body() createConstructorResultDto: CreateConstructorResultDto) {
    return await this.constructorResultsService.create(createConstructorResultDto);
  }

  @Get()
  async findAll() {
    return await this.constructorResultsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.constructorResultsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConstructorResultDto: UpdateConstructorResultDto) {
    return await this.constructorResultsService.update(id, updateConstructorResultDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.constructorResultsService.remove(id);
  }
}
