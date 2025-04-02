import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    if (!username || !password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { username: username, sub: '1' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
