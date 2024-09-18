import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ConstructorsService } from './constructors.service';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';
import { Constructor } from './entities/constructor.schema';

@Controller('constructors')
export class ConstructorsController {
  constructor(private readonly constructorsService: ConstructorsService) {}

  @Post()
  async create(@Body() createConstructorDto: CreateConstructorDto){
    return await this.constructorsService.create(createConstructorDto);
  }

  @Get()
  async findAll(): Promise<Constructor[]> {
    return await this.constructorsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.constructorsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConstructorDto: UpdateConstructorDto) {
    return await this.constructorsService.update(id, updateConstructorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.constructorsService.remove(id);
  }
}
