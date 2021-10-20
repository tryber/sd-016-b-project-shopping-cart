const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  test('fetchProducts deve chamar a função fetch quando executada com o argumento "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('fetchProducts deve chamar a função fetch e utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" quando executada com o argumento "computador"', async () => {
    expect.assertions(1);
    const expectedQueryUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedQueryUrl);
  });
});
