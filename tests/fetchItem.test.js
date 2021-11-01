const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('must be a function', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('expects function to have been called', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });

  it('expects correct endpoint', () => {
    const correctEndpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(correctEndpoint)
  });

  it('expects fetch to return JSON object', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item)
  })

  it('expects no parameters to return error', async () => {
    const errorExpected = new Error('You must provide an url')
    const result = await fetchItem()
    expect(result).toEqual(errorExpected)
  })

});
 