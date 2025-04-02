import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string; // Se llenará desde randomuser.me

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ enum: ['male', 'female', 'other'], required: false })
  @IsIn(['male', 'female', 'other'])
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  // externalData se obtiene de randomuser.me
}
