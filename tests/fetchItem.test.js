const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se é função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se o endpoint está correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  
  it('Teste se o retorno da função é uma estrutura ao objeto `item`', async () => {
    const testFetch = await fetchItem('MLB1615760527');
    expect(testFetch).toEqual(item);
  });
});
