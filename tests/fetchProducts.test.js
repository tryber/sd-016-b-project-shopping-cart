const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts deve ser uma funcao', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao chamar fetchProducts com o argumento computador, testa se fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar fetchProducts com o argumento computador, verifica o endpoint do fetch', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('testa se o retorno da funcao é um objeto igual a computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })
});
