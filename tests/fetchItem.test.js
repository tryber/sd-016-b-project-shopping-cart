const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  //Teste #1
  it('Check if fetchItem is a function', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });
  // Teste #2
  it('Check if fetch is called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  // Teste #3
  it('Check if endpoint with argument MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527');
  });
  // Teste #4
  it('Check if return of function fetchItem with argument MLB1615760527 to equal a item object', async () => {
    const testFetch = await fetchItem('MLB1615760527');
    expect(testFetch).toEqual(item);
  });
  //Teste #5
  // it('Check if return of function fetchItem without parameter, provide an message error', async () => {
  //   const testFetchWithoutArgument = await fetchItem();
  //   const error = new Error('You must provide an url');
  //   expect(testFetchWithoutArgument).toEqual(error);
  // });
});
