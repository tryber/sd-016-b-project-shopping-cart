const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifies if fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifies if the fetch is called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifies the endpoint', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Tests if returns the object required by "item"', async () => {
    const fetchTest = await fetchItem('MLB1615760527');
    expect(fetchTest).toEqual(item);
  });

  it('Verifies if it has an url endpoint as parameter', async () => {
    const apiError = new Error('You must provide an url');
    const fetchYetAgain = await fetchItem();
     expect(fetchYetAgain).toEqual(apiError); 
  });
});
