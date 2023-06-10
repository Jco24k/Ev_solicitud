import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
 
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,

  ){

  }
  async authLogin(authUserDto: AuthDto) {
    const { password, email } = authUserDto;
    const user = await this.userRepository.authLogin(email)
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (username)');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }
    return {
      ...user,
      token: this.getJwt({ id: user.id })
    };
  }


  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
