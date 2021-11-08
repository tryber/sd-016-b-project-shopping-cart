const fetchSimulator = require('../mocks/fetchSimulator');
const fetchItem = require('../helpers/fetchItem');
const item = require('../mocks/item');
const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

window.fetch = jest.fn(fetchSimulator);

const test = fetchItem();

describe('2 - Teste a função fetchItem', () => {
  it('Teste a função fetchItem', () => {
    expect(typeof fetchItem).toBe('function');
  });
});