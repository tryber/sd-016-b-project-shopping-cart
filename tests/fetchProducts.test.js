const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  }) 
  it('lalala', () => {
    expect(fetchProducts()).toEqual(5)
  }) 
});
