const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {

  it('fetchItem is a function', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('When invoke fetchItem, fetch is called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('When fetchItem is execute with args, fetch use endpoint', () => { 
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Return json file', async() => {
    const getItemId = await fetchItem('MLB1615760527');
    expect(getItemId).toEqual(item);
  });

  it('When calling fetchItem without argument, it returns as error: "You must provide a url"', async() => {
    const productItem = await fetchItem();
    const error = new Error('You must provide an url');
    expect(productItem).toEqual(error);
  });
  
});
