const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('Should fetchProducts have been called', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('Should return computadorSearch with params computador', async () => {
    const request = await fetchProducts('computador')

    expect(request).toEqual(computadorSearch)
  })

  it('Should throw an error when there is no param', async () => {
    await expect(fetchProducts()).rejects.toEqual(
      new Error('You must provide an url')
    )
  })
});
