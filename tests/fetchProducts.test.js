const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('É função?', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', () => {
    fetchProducts('computador')
    expect(fetch).toBeCalled()
  });
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint;', async () => {
    fetchProducts('computador')
    await expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  test('teste 4', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('teste 5', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url').toString());
  });
});
