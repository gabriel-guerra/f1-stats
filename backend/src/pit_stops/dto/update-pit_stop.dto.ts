import { PartialType } from '@nestjs/mapped-types';
import { CreatePitStopDto } from './create-pit_stop.dto';

export class UpdatePitStopDto extends PartialType(CreatePitStopDto) {}
