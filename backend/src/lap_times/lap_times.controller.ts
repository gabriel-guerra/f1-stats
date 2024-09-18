import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LapTimesService } from './lap_times.service';
import { CreateLapTimeDto } from './dto/create-lap_time.dto';
import { UpdateLapTimeDto } from './dto/update-lap_time.dto';

@Controller('lap-times')
export class LapTimesController {
  constructor(private readonly lapTimesService: LapTimesService) {}

  @Post()
  async create(@Body() createLapTimeDto: CreateLapTimeDto) {
    return await this.lapTimesService.create(createLapTimeDto);
  }

  @Get()
  async findAll() {
    return await this.lapTimesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.lapTimesService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLapTimeDto: UpdateLapTimeDto) {
    return await this.lapTimesService.update(id, updateLapTimeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.lapTimesService.remove(id);
  }
}
