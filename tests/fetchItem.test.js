const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('verifica se o fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test ('verifica se o endpoint foi usado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  test ('verifica se o retorno da função é igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  test ('retorno se a função não tiver argumento', async () => {
    const result = await fetchItem();
    const error = new Error('You must provide an url');
    expect(result).toEqual(error);
  })
});

