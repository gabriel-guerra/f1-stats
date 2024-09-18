import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverStandingDto } from './create-driver_standing.dto';

export class UpdateDriverStandingDto{
    raceId: number;
    driverId: number;
    points: number;
    position: number;
    positionText: string;
    wins: number;
}