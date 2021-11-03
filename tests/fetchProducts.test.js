const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test ('verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  test ('verifica se a fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test ('verifica se o endpoint do mercado livre foi usado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  test ('verifica se o retorno da função é igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  test ('retorno se a função não tiver argumento', async () => {
    const result = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(result).toEqual(error);
  })
});
