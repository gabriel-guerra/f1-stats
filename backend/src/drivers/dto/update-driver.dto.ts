import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';

export class UpdateDriverDto{
    driverRef: string;
    number: string;
    code: string;
    forename: string;
    surname: string;
    dob: string;
    nationality: string;
    url: string;
}
