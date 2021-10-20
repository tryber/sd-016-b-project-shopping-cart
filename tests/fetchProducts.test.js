const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // teste 1
  it('Verifica se a função existe', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // teste 4
  it('Verifica o retorno da função', async () => {
    const response = await fetchProducts('computador');

    expect.assertions(1);
    expect(response).toEqual(computadorSearch);
  })
});
