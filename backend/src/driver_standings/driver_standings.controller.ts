import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverStandingsService } from './driver_standings.service';
import { CreateDriverStandingDto } from './dto/create-driver_standing.dto';
import { UpdateDriverStandingDto } from './dto/update-driver_standing.dto';

@Controller('driver-standings')
export class DriverStandingsController {
  constructor(private readonly driverStandingsService: DriverStandingsService) {}

  @Post()
  async create(@Body() createDriverStandingDto: CreateDriverStandingDto) {
    return await this.driverStandingsService.create(createDriverStandingDto);
  }

  @Get()
  async findAll() {
    return await this.driverStandingsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.driverStandingsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDriverStandingDto: UpdateDriverStandingDto) {
    return await this.driverStandingsService.update(id, updateDriverStandingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driverStandingsService.remove(id);
  }
}
