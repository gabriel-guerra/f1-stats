import { PartialType } from '@nestjs/mapped-types';
import { CreateQualifyingDto } from './create-qualifying.dto';

export class UpdateQualifyingDto extends PartialType(CreateQualifyingDto) {}
