const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('fetchItem is function', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('fetchItem have been called', () => {  
    fetchItem('MLB1615760527');  
    expect(fetch).toHaveBeenCalled();
  });

  it('which endpoint has been used', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('structure data, is equal to item', async () => {
    const test = await fetchItem('MLB1615760527');;
    expect(test).toEqual(item);
  });

  it('if param of fetchItem is undefined return error', async () => {
    const error = new Error('You must provide an url')
    const test = await fetchItem();
    expect(test).toEqual(error);
  });
});
