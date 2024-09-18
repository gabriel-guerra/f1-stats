import { PartialType } from '@nestjs/mapped-types';
import { CreateConstructorResultDto } from './create-constructor_result.dto';

export class UpdateConstructorResultDto {
    raceId: number;
    constructorId: number;
    points: number;
    status: string;
}
