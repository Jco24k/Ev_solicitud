import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/interfaces/roles.enum';
import { UserRoleGuard } from '../guards/user-role.guard';
import { AuthParameterDto } from '../dto/auth-paramter.dto';
import { RoleProtected } from './role-protected.decorator';
import { UserProtected } from './user-protected.decorator';
import { UserSameGuard } from '../guards/user-same.guard';


export function Auth({ roles = [], sameUser = false }: AuthParameterDto) {
  return applyDecorators(
    RoleProtected(...roles),
    UserProtected(sameUser),
    UseGuards(AuthGuard(), UserRoleGuard, UserSameGuard),
  );
}
