const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts deve ser uma função.', () => {

    expect.assertions(1)

    expect(fetchProducts).toBeInstanceOf(Function)
  })
  fail('Teste vazio');
});
