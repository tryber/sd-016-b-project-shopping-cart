const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('Check fetchItem is a function', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('Check fetchItem calls fetch() function', () => {
    expect(fetchItem('MLB1615760527')).toBeInstanceOf(Promise);
  });

  it('Check fetchItem return expected JSON', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Check fetchItem throw errors when called without parameters', () => {
    expect(() => fetchItem().toThrowError('You must provide an url'));
  });
});
