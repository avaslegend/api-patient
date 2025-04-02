import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../../../src/patients/patients.controller';
import { PatientsService } from '../../../src/patients/patients.service';
import { CreatePatientDto } from '../../../src/patients/dto/create-patient.dto';
import { UpdatePatientDto } from '../../../src/patients/dto/update-patient.dto';
import { FilterPatientDto } from '../../../src/patients/dto/filter-patient.dto';
import { Patient } from '../../../src/common/interfaces/patient.interface';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: {
            createPatient: jest.fn(),
            getPatientById: jest.fn(),
            updatePatient: jest.fn(),
            deletePatient: jest.fn(),
            getPatients: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  describe('createPatient', () => {
    it('should create a patient and return it', async () => {
      const dto: CreatePatientDto = {
        lastName: 'Doe',
        gender: 'male',
        birthDate: '1990-01-01',
        email: 'john@example.com',
        phone: '1234567890',
      };

      const result: Patient = {
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

      jest.spyOn(service, 'createPatient').mockResolvedValue(result);
      expect(await controller.createPatient(dto)).toEqual(result);
    });
  });

  describe('getPatientById', () => {
    it('should return a patient if found', async () => {
      const result: Patient = {
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

      jest.spyOn(service, 'getPatientById').mockResolvedValue(result);
      expect(await controller.getPatientById('1')).toEqual(result);
    });
  });

  describe('updatePatient', () => {
    it('should update and return the updated patient', async () => {
      const dto: UpdatePatientDto = { email: 'new@example.com' };
      const result: Patient = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        birthDate: '1990-01-01',
        email: 'new@example.com',
        phone: '1234567890',
        externalData: { country: 'USA', address: '123 Main St' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest.spyOn(service, 'updatePatient').mockResolvedValue(result);
      expect(await controller.updatePatient('1', dto)).toEqual(result);
    });
  });

  describe('deletePatient', () => {
    it('should call deletePatient and return undefined', async () => {
      jest.spyOn(service, 'deletePatient').mockResolvedValue(undefined);
      expect(await controller.deletePatient('1')).toBeUndefined();
    });
  });

  describe('getPatients', () => {
    it('should return a result with items', async () => {
      const filter: FilterPatientDto = {};
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
      jest.spyOn(service, 'getPatients').mockResolvedValue(resultObj);
      expect(await controller.getPatients(filter)).toEqual(resultObj);
    });
  });
});
