const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('1.1 - testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  test('1.2 - testa se fetch foi chamado', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  test('1.3 - testa se o endpoint e "computador', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=$computador`)
  })
  test('1.4 - testa se o retorno de fetchProducts com o argumento "computador" e uma estrutura de dados', async () => {
    const fetcher = await fetchProducts('computador')
    expect(typeof fetcher).toEqual(typeof computadorSearch)
  })
  test('1.5 - testa se ao chamar fetchProducts sem argumento, retorna um erro', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an URL.'))
  })
});
