const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  test('2.1 - testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  test('2.2 - testa se fetch foi chamado', () => {
    fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalled();
  })
  test('2.3 - testa se o endpoint e "MLB1615760527"', () => {
    fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527")
  })
  test('2.4 - testa se o retorno de fetchProducts com o argumento "computador" e uma estrutura de dados', async () => {
    const fetcher = await fetchItem("MLB1615760527")
    expect(typeof fetcher).toEqual(typeof item)
  })
  test('2.5 - testa se ao chamar fetchProducts sem argumento, retorna um erro', async () => {
    await expect(fetchItem()).rejects.toEqual(new Error('You must provide an URL.'))
  })
  // fail('Teste vazio');
});
