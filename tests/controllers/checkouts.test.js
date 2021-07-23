const request = require('supertest-as-promised');
const app = require('../../src/app');

describe('Checkouts endpoint', () => {
  describe('POST checkouts', () => {
    it('should create new checkout', async () => {
      const body = {
        product_code: 'PEN',
      }

      const expectBody = {
        id: '1234',
        products: ['PEN'],
      };

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', expectBody);
    });
  });
});