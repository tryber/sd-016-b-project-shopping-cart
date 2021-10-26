const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Se fetch foi chamado ao executar `fetchProducts` com o parâmetro "computador".', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Se fetch usa o endpoint especificado ao executar `fetchProducts` com o parâmetro "computador".', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
});
