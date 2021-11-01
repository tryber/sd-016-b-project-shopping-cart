const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('must be a function', () => {
    expect(typeof fetchProducts).toBe('function')
  });

  it('expects fetch to be called', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  
  it('expects correct endpoint', () => {
    const correctEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(correctEndpoint)
  })

  it('expects fetch to return JSON object', async () => {
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch)
  })

  it('expects no parameters to return error', async () => {
    const errorExpected = new Error('You must provide an url')
    const result = await fetchProducts()
    expect(result).toEqual(errorExpected)
  })

});
