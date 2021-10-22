const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem its a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('function fetchItem heve been called', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Called fetchItem, use expect endpoint', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('function return to equal expect', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  });
});
