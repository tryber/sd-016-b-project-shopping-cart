const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fetchProducts should be a function', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('Should fetchItem have been called', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  it('Should fetchItem use specific endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
});
