const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Se chamada com o parâmetro computador, verifica se a função foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Se chamada com o parâmetro computador, verifica se a função foi chamado com o parâmetro', () => {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Se o a chamada fetchProducts("computador") retorna objeto igual a computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Se chamada sem parâmetros retorna um erro', async () => {
    const errorReturn = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(errorReturn);
  });
});
