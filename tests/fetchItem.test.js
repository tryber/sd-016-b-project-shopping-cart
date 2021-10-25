const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  
  test('1 - fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  test('2 - fetch é chamada com fetchItem("MLB1615760527")', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('3 - Verifica o endpoint de fetch', () => {
    expect.assertions(2);
    const urlTestYes = 'https://api.mercadolibre.com/items/MLB1615760527';
    const urlTestNot = 'https://api.mercadolibre.com/items/outraCoisa';
    
    expect(fetch).toHaveBeenCalledWith(urlTestYes);
    expect(fetch).not.toHaveBeenCalledWith(urlTestNot);
  });

  test('4 - Retorno de fetchItem similar a item', async () => {
    expect.assertions(4);

    expect(await fetchItem('MLB1615760527')).toBe(item);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
    expect(await fetchItem()).not.toBe(item)
    expect(await fetchItem()).not.toEqual(item);
  });

  test('5 - Retorna erro: You must provide an url', async () => {
    expect.assertions(2);
    const errorMessage = new Error('You must provide an url');
    expect(await fetchItem()).toEqual(errorMessage);
    expect(await fetchItem()).not.toEqual('qualquerCoisa');
  });
});

