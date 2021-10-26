const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('teste', async () => {
    const response = await fetchProducts('computador')
    expect.assertions(5)

    expect(fetchProducts).toBeInstanceOf(Function)
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    expect( await fetchProducts('computador')).toEqual(computadorSearch)
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'))

  })
});
