import { PartialType } from '@nestjs/mapped-types';
import { CreateCircuitDto } from './create-circuit.dto';

export class UpdateCircuitDto{
    circuitRef: string;
    name: string;
    location: string;
    country: string;
    lat: number;
    lng: number;
    alt: number;
    url: string;
}
