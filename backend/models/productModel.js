const fs = require('fs');
const filePath = './database/products.json';

// GET:
const getProducts = () => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

const getProductById = (id) => {
    const products = getProducts();
    return products.find((product) => product.id === id);
  };

module.exports = {
  getProducts,
  getProductById,
};

