import './testSetup';
import request from 'supertest';
import app from '../index.js';
import companyRepository from '../repositories/company.repository.js';

describe('Company API', () => {
  describe('POST /api/companies', () => {
    it('should create a new company with valid data', async () => {
      const companyData = {
        cuit: '30-12345678-9',
        razonSocial: 'Empresa Válida SA'
      };

      const response = await request(app)
        .post('/api/companies')
        .send(companyData)
        .expect(201);

      expect(response.body).toMatchObject({
        cuit: companyData.cuit,
        razonSocial: companyData.razonSocial,
        fechaAdhesion: expect.any(String)
      });
    });

    it('should reject invalid CUIT format', async () => {
      const response = await request(app)
        .post('/api/companies')
        .send({
          cuit: '30-1234-9',
          razonSocial: 'Empresa Test'
        })
        .expect(400);

      expect(response.body.errors[0].msg).toBe('Invalid CUIT format');
    });

    it('should reject duplicate CUIT', async () => {
      const companyData = {
        cuit: '30-11112222-3',
        razonSocial: 'Empresa Original'
      };

      await companyRepository.create(companyData);

      const response = await request(app)
        .post('/api/companies')
        .send(companyData)
        .expect(400);

      expect(response.body.message).toMatch(/duplicate key error/);
    });
  });
});