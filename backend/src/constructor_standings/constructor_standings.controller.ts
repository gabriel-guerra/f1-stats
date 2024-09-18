import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConstructorStandingsService } from './constructor_standings.service';
import { CreateConstructorStandingDto } from './dto/create-constructor_standing.dto';
import { UpdateConstructorStandingDto } from './dto/update-constructor_standing.dto';

@Controller('constructor-standings')
export class ConstructorStandingsController {
  constructor(private readonly constructorStandingsService: ConstructorStandingsService) {}

  @Post()
  async create(@Body() createConstructorStandingDto: CreateConstructorStandingDto) {
    return await this.constructorStandingsService.create(createConstructorStandingDto);
  }

  @Get()
  async findAll() {
    return await this.constructorStandingsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.constructorStandingsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConstructorStandingDto: UpdateConstructorStandingDto) {
    return await this.constructorStandingsService.update(id, updateConstructorStandingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.constructorStandingsService.remove(id);
  }
}
