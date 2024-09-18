import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driversService.create(createDriverDto);
  }

  @Get()
  async findAll() {
    return await this.driversService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.driversService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return await this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driversService.remove(id);
  }
}
