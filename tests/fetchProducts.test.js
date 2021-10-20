const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('Should return computadorSearch with params computador', async () => {
    const request = await fetchProducts('computador')

    expect(request).toEqual(computadorSearch)
  })
});
