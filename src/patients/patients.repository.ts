import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Patient } from '../common/interfaces/patient.interface';
import { FilterPatientDto } from './dto/filter-patient.dto';

@Injectable()
export class PatientsRepository {
  private readonly dynamoDb: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
    this.tableName = process.env.PATIENT_DATA_TABLE || 'Patients';
  }

  async create(patient: Patient): Promise<void> {
    await this.dynamoDb
      .put({
        TableName: this.tableName,
        Item: patient,
      })
      .promise();
  }

  async findById(id: string): Promise<Patient | null> {
    const result = await this.dynamoDb
      .get({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();
    return result.Item as Patient;
  }

  async update(id: string, patient: any): Promise<void> {
    await this.dynamoDb
      .put({
        TableName: this.tableName,
        Item: patient,
      })
      .promise();
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDb
      .delete({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();
  }

  async findAll(filter: FilterPatientDto): Promise<{ items: Patient[] }> {

    if (filter.gender && (filter.birthDateBefore || filter.birthDateAfter)) {
      let keyCondition = 'gender = :g';
      const expressionValues: { [key: string]: any } = {
        ':g': filter.gender,
      };

      if (filter.birthDateBefore && filter.birthDateAfter) {
        keyCondition += ' and birthDate BETWEEN :after AND :before';
        expressionValues[':after'] = filter.birthDateAfter;
        expressionValues[':before'] = filter.birthDateBefore;
      } else if (filter.birthDateBefore) {
        keyCondition += ' and birthDate <= :before';
        expressionValues[':before'] = filter.birthDateBefore;
      } else if (filter.birthDateAfter) {
        keyCondition += ' and birthDate >= :after';
        expressionValues[':after'] = filter.birthDateAfter;
      }

      const params: DynamoDB.DocumentClient.QueryInput = {
        TableName: this.tableName,
        IndexName: 'GenderBirthDateIndex',
        KeyConditionExpression: keyCondition,
        ExpressionAttributeValues: expressionValues,
      };

      const result = await this.dynamoDb.query(params).promise();
      return {
        items: result.Items as Patient[],
      };
    } else {

      const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: this.tableName,
      };

      const filterExpressions: string[] = [];
      const expressionValues: { [key: string]: any } = {};

      if (filter.firstName) {
        filterExpressions.push('firstName = :fn');
        expressionValues[':fn'] = filter.firstName;
      }
      if (filter.lastName) {
        filterExpressions.push('lastName = :ln');
        expressionValues[':ln'] = filter.lastName;
      }
      if (filter.gender) {
        filterExpressions.push('gender = :g');
        expressionValues[':g'] = filter.gender;
      }
      if (filter.birthDateBefore) {
        filterExpressions.push('birthDate < :before');
        expressionValues[':before'] = filter.birthDateBefore;
      }
      if (filter.birthDateAfter) {
        filterExpressions.push('birthDate > :after');
        expressionValues[':after'] = filter.birthDateAfter;
      }

      if (filterExpressions.length > 0) {
        params.FilterExpression = filterExpressions.join(' AND ');
        params.ExpressionAttributeValues = expressionValues;
      }

      const result = await this.dynamoDb.scan(params).promise();
      return {
        items: result.Items as Patient[],
      };
    }
  }
}
