const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('testa se fetchProducts e uma funcao', async () => {
    expect.assertions(2);
    await expect(fetchProducts).toBeDefined();
    await expect(typeof fetchProducts).toBe('function');
  })
});
