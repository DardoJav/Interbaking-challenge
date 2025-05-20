import './testSetup';
import request from 'supertest';
import app from '../index.js';
import companyRepository from '../repositories/company.repository.js';
import transferRepository from '../repositories/transfer.repository.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants.js';

describe('Transfer API', () => {
  let companyId: string;
  let validToken: string;

  beforeAll(async () => {
    const company = await companyRepository.create({
      cuit: '30-12345678-9',
      razonSocial: 'Testing Company'
    });
    companyId = company._id.toString();

    validToken = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
  });

  describe('GET /api/transfers/companies-last-month', () => {
    it('should return companies with recent transfers', async () => {
      await transferRepository.create({
        importe: 150000,
        empresa: companyId,
        cuentaDebito: 'ARG111111111',
        cuentaCredito: 'ARG222222222',
        fecha: new Date()
      });

      const response = await request(app)
        .get('/api/transfers/companies-last-month')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body.length).toBe(1);
      expect(response.body[0]._id).toBe(companyId);
    });

    it('should return empty array if no transfers', async () => {
      const response = await request(app)
        .get('/api/transfers/companies-last-month')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return 401 without token', async () => {
      await request(app)
        .get('/api/transfers/companies-last-month')
        .expect(401);
    });
  });
});