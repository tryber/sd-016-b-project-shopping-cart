const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Test fecthItem function', () => {
  it('if it is a function', () => {
    expect(typeof (fetchItem)).toStrictEqual('function');
  })
  it('if fetch is called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('if fetch is called with the right endpoint', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('if return the right object', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toStrictEqual(item);
  });
  it('must return an error with no parameter', async () => {
    const expected = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toStrictEqual(expected);
  });
});
