import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../../../src/patients/patients.service';
import { PatientsRepository } from '../../../src/patients/patients.repository';
import { NotFoundException } from '@nestjs/common';
import { Patient } from '../../../src/common/interfaces/patient.interface';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: PatientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: PatientsRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<PatientsRepository>(PatientsRepository);
  });

  describe('getPatientById', () => {
    it('should return a patient if found', async () => {
      const patient: Patient = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        birthDate: '1990-01-01',
        email: 'john@example.com',
        phone: '1234567890',
        externalData: { country: 'USA', address: '123 Main St' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      jest.spyOn(repository, 'findById').mockResolvedValue(patient);
      expect(await service.getPatientById('1')).toEqual(patient);
    });

    it('should throw NotFoundException if patient not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);
      await expect(service.getPatientById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPatients', () => {
    it('should return a result with items (without pagination key)', async () => {
      const resultObj = {
        items: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male' as const,
            birthDate: '1990-01-01',
            email: 'john@example.com',
            phone: '1234567890',
            externalData: { country: 'USA', address: '123 Main St' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };
      jest.spyOn(repository, 'findAll').mockResolvedValue(resultObj);
      const filter = { limit: 10 } as any; // Aunque limit no se usa, es solo para test
      const result = await service.getPatients(filter);
      expect(result).toEqual(resultObj);
    });
  });

  describe('createPatient', () => {
    it('should create a patient and return it', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(undefined);
      const dto = {
        lastName: 'Doe',
        gender: 'male',
        birthDate: '1990-01-01',
        email: 'john@example.com',
        phone: '1234567890',
      };
      const patient = await service.createPatient(dto);
      expect(patient).toHaveProperty('id');
      expect(repository.create).toHaveBeenCalled();
    });
  });
});
