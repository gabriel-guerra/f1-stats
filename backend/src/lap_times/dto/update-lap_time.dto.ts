import { PartialType } from '@nestjs/mapped-types';
import { CreateLapTimeDto } from './create-lap_time.dto';

export class UpdateLapTimeDto extends PartialType(CreateLapTimeDto) {
    raceId: number;
    driverId: number;
    lap: number;
    position: number;
    time: string;
    milliseconds: number;
}
