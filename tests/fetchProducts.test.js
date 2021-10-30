const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste que verifica se fechProducts é uma Função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Teste que quando passado computador como argumento a função, verifica se a fetch é chamada',
  () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste que quando passado o argumento COMPUTADOR, o endpoint é alterado corretamente', 
  () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint); 
  });
  it('Testa o retorno da funçãp fecthProduct: deve ser um objeto igual à computadorSearch', 
  async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('Teste de retorno de erro caso não seja passado a url', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })

});
