const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('FectchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Se o argumento for computador de fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chama-la com o argumento, testa se o endpoint é computador', () => {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('deve retornar um erro', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);
  });
});
