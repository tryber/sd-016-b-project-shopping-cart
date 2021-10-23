const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // requisito 1
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  // requisito 2
  it('testa a func com o argumento computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // requisito 3
  it('testa o fetch com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  // requisito 4
  it('retorno da func é igual a computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  // requisito 5
  it('Sem argumento deve retornar um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);    
  });
  // OBRIGADO PROFESSOR BERNARDO TRIBO 16 - A
});
