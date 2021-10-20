const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Verificar se fetchProduct é uma função fecthProducts', () => {
    const typeFunction = typeof fetchProducts;
    expect(typeFunction).toBe('function');
  })
});
