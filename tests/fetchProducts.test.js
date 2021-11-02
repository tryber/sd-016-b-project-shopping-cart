const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fechProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se a função fetchProducts com o parâmetro "computador" foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica o endpoint ao chamar a função fetchProducts com parâmetro o "computador"', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Verifica se o retorno da função fetchProducts com o parâmetro "computador" é igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('Verifica se retorna um erro ao chamar fetchProducts sem parâmetro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectError);
  });
});
