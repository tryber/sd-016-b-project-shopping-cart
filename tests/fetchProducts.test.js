const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui  
  it('Verificar se é uma function', () => {
    const isFunction = typeof fetchProducts;
    expect(isFunction).toBe('function');
  })
  it('Verifica se a função é chamada', () => {
    expect(fetchProducts()).toBeTruthy();
  });
});
