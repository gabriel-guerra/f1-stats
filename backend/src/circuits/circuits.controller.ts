import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { Circuit } from './entities/circuit.schema';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
  async create(@Body() createCircuitDto: CreateCircuitDto) {
    return await this.circuitsService.create(createCircuitDto);
  }

  @Get()
  async findAll(): Promise<Circuit[]> {
    return await this.circuitsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.circuitsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCircuitDto: UpdateCircuitDto) {
    return await this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.circuitsService.remove(id);
  }
}
