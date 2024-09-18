import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QualifyingService } from './qualifying.service';
import { CreateQualifyingDto } from './dto/create-qualifying.dto';
import { UpdateQualifyingDto } from './dto/update-qualifying.dto';

@Controller('qualifying')
export class QualifyingController {
  constructor(private readonly qualifyingService: QualifyingService) {}

  @Post()
  create(@Body() createQualifyingDto: CreateQualifyingDto) {
    return this.qualifyingService.create(createQualifyingDto);
  }

  @Get()
  findAll() {
    return this.qualifyingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualifyingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQualifyingDto: UpdateQualifyingDto) {
    return this.qualifyingService.update(+id, updateQualifyingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualifyingService.remove(+id);
  }
}
