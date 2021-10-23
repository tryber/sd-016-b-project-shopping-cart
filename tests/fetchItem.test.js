const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Teste se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });

  test('Teste o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste o endpoint', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('Teste o retorno da função', async () => {
    const valorAtual = await fetchItem('MLB1615760527');
    expect(valorAtual).toEqual(item);
  });

  test('Teste mensagem de erro', async () => {
    const itemFetch = await fetchItem();
    const erro = new Error('You must provide an url');
    expect(itemFetch).toEqual(erro);
  });

});
