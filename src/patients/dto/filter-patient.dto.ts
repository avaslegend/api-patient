import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNumber, IsIn } from 'class-validator';

export class FilterPatientDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Pacientes nacidos antes de esta fecha' })
  @IsOptional()
  @IsDateString()
  birthDateBefore?: string;

  @ApiPropertyOptional({ description: 'Pacientes nacidos después de esta fecha' })
  @IsOptional()
  @IsDateString()
  birthDateAfter?: string;

}
