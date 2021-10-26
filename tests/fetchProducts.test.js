const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('se a função fetchProducts com parametro computador, chama fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fecthProducts com parametro computador, teste se o endpoint é o correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('ao chamar a função fetchProducts sem parametro, se retorna uma mensagem de erro', async () => {
    const errorMessage = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(errorMessage);
  });
});
