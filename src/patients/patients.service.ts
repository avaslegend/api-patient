import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsRepository } from './patients.repository';
import { FilterPatientDto } from './dto/filter-patient.dto';
import { Patient } from '../common/interfaces/patient.interface';

@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async createPatient(dto: CreatePatientDto): Promise<Patient> {
    const randomUserApiUrl = process.env.RANDOMUSER_API_URL || 'https://randomuser.me/api';
    const response = await axios.get(randomUserApiUrl);
    const randomData = response.data.results[0];

    const patient: Patient = {
      id: uuid(),
      firstName: randomData.name.first, // Se sobreescribe o se usa el dato del DTO
      lastName: dto.lastName || '',
      gender: dto.gender as "male" | "female" | "other",
      birthDate: dto.birthDate || '',
      email: dto.email || '',
      phone: dto.phone || '',
      externalData: {
        country: randomData.location.country,
        address: `${randomData.location.street.name}, ${randomData.location.city}`,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.patientsRepository.create(patient);
    return patient;
  }

  async getPatientById(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findById(id);
    if (!patient) {
      throw new NotFoundException(`Paciente con ID "${id}" no encontrado.`);
    }
    return patient;
  }

  async updatePatient(id: string, dto: UpdatePatientDto) {
    const existing = await this.getPatientById(id);

    // Actualizamos solo los campos recibidos
    const updated = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    await this.patientsRepository.update(id, updated);
    return updated;
  }

  async deletePatient(id: string) {
    await this.getPatientById(id); // Para lanzar excepción si no existe
    return this.patientsRepository.delete(id);
  }

  async getPatients(filter: FilterPatientDto) {
    return this.patientsRepository.findAll(filter);
  }
}
