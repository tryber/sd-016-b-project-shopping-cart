const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it ('Testar se seu tipo é uma função', () => {
   expect(typeof fetchProducts).toBe('function');
  })
  it ('Ao executar a função testar de o fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it ('Testa se a função com o argumento retorna o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('Testa se o retorno da função é igual a computadorSearch', async () => {
    const returned = await  fetchProducts('computador');
    expect(returned).toEqual(computadorSearch);
  })
  it('Testa erro se não houver parametro', async () => {
    const expectedError = new Error ('You must provide an url');
    const result = await fetchProducts( );
    expect(result).toEqual(expectedError);
  });
  });
