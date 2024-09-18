import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PitStopsService } from './pit_stops.service';
import { CreatePitStopDto } from './dto/create-pit_stop.dto';
import { UpdatePitStopDto } from './dto/update-pit_stop.dto';

@Controller('pit-stops')
export class PitStopsController {
  constructor(private readonly pitStopsService: PitStopsService) {}

  @Post()
  create(@Body() createPitStopDto: CreatePitStopDto) {
    return this.pitStopsService.create(createPitStopDto);
  }

  @Get()
  findAll() {
    return this.pitStopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitStopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePitStopDto: UpdatePitStopDto) {
    return this.pitStopsService.update(+id, updatePitStopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pitStopsService.remove(+id);
  }
}
