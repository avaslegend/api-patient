import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario' })
  @IsString()
  @IsNotEmpty()
  username: string | undefined;

  @ApiProperty({ example: 'contraseña' })
  @IsString()
  password: string | undefined;
}
