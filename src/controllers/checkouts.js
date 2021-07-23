function create(request, response) {
  const { product_code } = request.body

  products = ['PEN', 'TSHIRT', 'MUG']

  if (!products.includes(product_code)) {
    return response.status(404).json(
      {
        message: `Product ${product_code} not found`
      });
  }

  response.json(
    {
      status: 'Success',
      message: {
        id: '1234',
        products: [product_code],
      }
    });
}

module.exports = { create };