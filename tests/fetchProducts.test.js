const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  test('Testar se fetchProduct é executada quando passado o parâmetro "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
});