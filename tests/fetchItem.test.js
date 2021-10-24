const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('Check fetchItem is a function', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('Check fetchItem call fetch() function', async () => {
    expect.assertions(1);

    await fetchItem('MLB1341706310');
    expect(fetch).toHaveBeenCalled();
  });

  it('Check fetchItem call fetch() with params', async () => {
    expect.assertions(1);

    const itemId = 'MLB1341706310'
    await fetchItem('MLB1341706310');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${itemId}`);
  });

  it('Check fetchItem return expected JSON', async () => {
    expect.assertions(1);

    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Check fetchItem throw errors when called without parameters', () => {
    expect(() => fetchItem()).toThrow(new Error('You must provide an url'));
  });
});
