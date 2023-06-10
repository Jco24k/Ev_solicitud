import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/common/interfaces/roles.enum';
import { User } from 'src/modules/user/entities/User.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: Roles[] = this.reflector.get(META_ROLES, context.getHandler());
        if (!validRoles || validRoles.length == 0) return true;
        const req = context.switchToHttp().getRequest();
        const user: User = req.user;
        if (!user) throw new InternalServerErrorException('User not found (request)');
        for (const role of user.roles)
            if (validRoles.includes(role.name)) return true;
        throw new ForbiddenException(`User with ${user.id} need a valid role`)
    }
}