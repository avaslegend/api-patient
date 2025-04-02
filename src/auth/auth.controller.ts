import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthService } from './jwt-auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  /*@Post('login')
  @ApiOperation({summary: 'Valida credenciales y retorna un token JWT'})
  @ApiResponse({ status: 201, description: 'Token generado correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    // En un escenario real se debería validar las credenciales.
    // Aquí asumimos que las credenciales son válidas y se genera un token.
    const payload = { username: loginDto.username, sub: 'some-user-id' };
    const token = this.jwtAuthService.sign(payload);
    return { access_token: token };
  }*/

  @Post('login')
  @ApiOperation({ summary: 'Valida credenciales y retorna un token JWT' })
  @ApiResponse({ status: 201, description: 'Token generado exitosamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  logins(@Body() loginDto: LoginDto) {
    return this.jwtAuthService.login(loginDto);
  }
}
