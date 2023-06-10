import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { META_USER } from '../decorators/user-protected.decorator';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/user/entities/User.entity';
import { Roles } from 'src/common/interfaces/roles.enum';
import { Role } from 'src/modules/role/entities/Role.entity';

@Injectable()
export class UserSameGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {
    }
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const verify: boolean = this.reflector.get(META_USER, context.getHandler());
        if (verify) return true;
        const { id, roles }: User = request.user;
        const idParam: string = request.params.id;
        const nameRoles: Roles[] = roles.map(({ name }) => name)
        if (nameRoles.includes(Roles.ADMINISTRADOR)) return true
        if (idParam !== id) {
            throw new ForbiddenException('You are not allowed to perform this action on another user');
        }
        return true;
    }
}