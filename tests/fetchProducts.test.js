const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se fetch foi chamada executando fetchProducts com o argumento computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetchProducts usou o endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Verifica se o retorno da função fetchProducts é igual ao mock computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it('Verifica se fetchProduct recebe algum parâmetro', async () => {
    const expectedError = new Error('You must provide an url');
    const resultFetch = await fetchProducts();
    expect(resultFetch).toEqual(expectedError);
  });
});
