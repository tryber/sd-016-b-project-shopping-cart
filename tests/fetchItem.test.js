const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('is it a funcion', () => {
    expect(typeof fetchItem,).toBe('function');
  })
  it('was fetch called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('ao chama-la com argumento computador testa se fetch foi chamada com endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('is fetchItem return equal to item', async () => {
    const results = await fetchItem('MLB1615760527'); 
    expect(results).toEqual(item);
  })
  it('must return an error', async () => {
    const result = await fetchItem();
    const expectedError = new Error('You must provide an url');
    expect(result).toEqual(expectedError);
  })
});
