var uuid = require('uuid');

function create(request, response) {
  const { product_code } = request.body

  products = ['PEN', 'TSHIRT', 'MUG']

  if (!products.includes(product_code)) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      });
  }

  response.status(200).json(
    {
      status: 'Success',
      message: {
        id: uuid.v1(),
        products: [product_code],
      }
    });
}

module.exports = { create };