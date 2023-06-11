import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { ConfigService, ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import config from "src/config/config";
import { UserRepository } from "src/modules/user/repository/user.repository";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(config.KEY)
        configService: ConfigType<typeof config>,
        private readonly userRepository: UserRepository
    ) {
        super({
            secretOrKey: configService.jwt.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this.userRepository.getOne({ where: { id } })
        if (!user) throw new UnauthorizedException('Token not valid');
        if (!user.isActive) throw new UnauthorizedException('User is inactive, talk with an admin');
        return user;
    }
}