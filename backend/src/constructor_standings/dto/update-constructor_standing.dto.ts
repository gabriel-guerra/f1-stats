import { PartialType } from '@nestjs/mapped-types';
import { CreateConstructorStandingDto } from './create-constructor_standing.dto';

export class UpdateConstructorStandingDto{
    raceId: number;
    constructorId: number;
    points: number;
    position: number;
    positionText: string;
    wins: number;   
}
