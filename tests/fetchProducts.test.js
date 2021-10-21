const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('test if fecthProducts its a function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  // fail('Teste vazio');
});
