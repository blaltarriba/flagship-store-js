const request = require('supertest-as-promised');
const app = require('../../src/app');

describe('Checkouts endpoint', () => {
  describe('POST checkouts', () => {
    it('should create new checkout', async () => {
      var productCode = 'PEN'
      const body = { product_code: productCode }
      const expectBody = {
        id: '1234',
        products: [productCode],
      };

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', expectBody);
    });

    it('failed when product does not exist', async () => {
      var productCode = 'FAKE'
      const body = { product_code: productCode }
      const expectBody = `Product ${productCode} not found`;

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', expectBody);
    });
  });
});