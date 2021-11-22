const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('1.1 Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('1.2 Execute a função com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('1.3 Teste se a função fetchProducts utiliza o endpoint do MELI', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('1.4 Teste o retorno de fetchProducts para ser igual a computadorSearch', async () => {
    const func = await fetchProducts('computador');
    expect(func).toEqual(computadorSearch);
  });

  test('1.5 Teste chamar a função sem parametro e retorne erro', async () => {
    const error = new Error ('You must provide an url');
    const func = await fetchProducts();
    expect(func).toEqual(error);
  });
});
