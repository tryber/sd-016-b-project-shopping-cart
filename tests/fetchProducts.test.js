const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('should be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('should be called', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('should be called with a correct endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  it('should be returned with a data equal to computerSearch', async () => {
    const response = await fetchProducts('computador')
      .then(response => response)
    expect(response).toEqual(computadorSearch)
  })

  it('should be an error if no url has been provided', async () => {
    const error = new Error('You must provide an url')
    const response = await fetchProducts()

    expect(response).toEqual(error)
  })
});
