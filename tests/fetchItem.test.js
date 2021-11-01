const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('tests if it\'s a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('test if it has been called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('check if it has been called with an url', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('compares with mocked object', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(item).toEqual(results);
  })
  it('tests if error message is twrown as function is called with blank param', async () => {
    const expectedError = new Error ('You must provide an url');
    const results = await fetchItem();
    expect(results).toEqual(expectedError);
    
  })
});
