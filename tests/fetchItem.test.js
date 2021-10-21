const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Expect fetchItem is a function', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });
  it('Expect when function FetchItem is executed, fetch es called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('Expect when function FetchItem is execute with parameter, fetch use endpoint', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527'
    );
  });
  it('Expected the json file return', async () => {
    const getItemId = await fetchItem('MLB1615760527');
    expect(getItemId).toEqual(item);
  });
  it('Testing return of function FetchItn without parameter, to be You must provide an url', async () => {
    const productsItem = await fetchItem();
    const error = new Error('You must provide an url');
    expect(productsItem).toEqual(error);
  });
});
