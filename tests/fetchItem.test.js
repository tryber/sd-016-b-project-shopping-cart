const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('fetch should be called', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  it('fetch should be called with the correct endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527')

    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  it('should be returned with data equal to "item" variable', async () => {
    const response = await fetchItem('MLB1615760527')

    expect(response).toEqual(item)
  })

  it('should be returned an error if no argument has been provide', async () => {
    const error = new Error('You must provide an url')
    const response = await fetchItem()

    expect(response).toEqual(error)
  })
});
