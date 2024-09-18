import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintResultDto } from './create-sprint_result.dto';

export class UpdateSprintResultDto extends PartialType(CreateSprintResultDto) {}
