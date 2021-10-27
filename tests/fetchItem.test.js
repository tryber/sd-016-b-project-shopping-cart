const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Must be a function', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Test if function fetchItem with argument calls fetch',
  () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('test correct endpoint', 
  () => {
    const endpoint =  'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint); 
  });
  it('test return fetchItem with argument', 
  async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  })
  it('must return error', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
