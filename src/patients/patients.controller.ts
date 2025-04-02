import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { PatientsService } from './patients.service';
  import { CreatePatientDto } from './dto/create-patient.dto';
  import { UpdatePatientDto } from './dto/update-patient.dto';
  import { FilterPatientDto } from './dto/filter-patient.dto';
  import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Patients')
  @Controller('patients')
  export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a patient'})
    async createPatient(@Body() createPatientDto: CreatePatientDto) {
      return this.patientsService.createPatient(createPatientDto);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a patient by id'})
    async getPatientById(@Param('id') id: string) {
      return this.patientsService.getPatientById(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a patient by id'})
    async updatePatient(
      @Param('id') id: string,
      @Body() updatePatientDto: UpdatePatientDto
    ) {
      return this.patientsService.updatePatient(id, updatePatientDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a patient by id'})
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePatient(@Param('id') id: string) {
      await this.patientsService.deletePatient(id);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get patients paginated and filtered'})
    async getPatients(@Query() filter: FilterPatientDto) {
      return this.patientsService.getPatients(filter);
    }
  }
  