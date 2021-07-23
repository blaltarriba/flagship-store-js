const request = require('supertest-as-promised');
const app = require('../../src/app');

describe('Checkouts endpoint', () => {
  describe('POST checkouts', () => {
    it('should create new checkout', async () => {
      var productCode = 'PEN'
      var body = { product_code: productCode }
      var expectProducts = [productCode]
      var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      const response = await request(app).post('/checkouts').send(body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toMatch(uuidRegex);
      expect(response.body).toHaveProperty('products', expectProducts);
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