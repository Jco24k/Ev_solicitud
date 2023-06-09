import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create/create-user.dto';
import { CreateUserCompleteDto } from './create/create-user-complete.dto';

export class UpdateUserDto extends PartialType(CreateUserCompleteDto) {}
