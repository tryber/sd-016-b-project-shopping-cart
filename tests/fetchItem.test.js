const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('1.1 - Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('1.2 - Execute a função fetchProducts com o argumento "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('1.3 - utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('1.4 - estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('1.5 - sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const err = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(err);
  });
});
