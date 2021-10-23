const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('É função?', () => {
    expect(typeof fetchItem).toBe('function')
  });
  test('Execute a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada;', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toBeCalled()
  });
  test('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint;', async () => {
    fetchItem('MLB1615760527')
    await expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  });
  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item;', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro;', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url').toString());
  });
});
