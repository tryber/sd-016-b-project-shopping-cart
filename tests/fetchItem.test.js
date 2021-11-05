const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se é função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se a função é chamada', () => {
    fetch('"https://api.mercadolibre.com/items/MLB1615760527"');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função chamada com argumento MLB1615760527 utiliza o endpoint ´https://api.mercadolibre.com/items/MLB1615760527´', () => {
    fetch('https://api.mercadolibre.com/items/MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se a função chamada com argumento ´computador´ retorna um objeto igual ao armazenado na constante computadorSearch', async () => {
    const resultExpected = await fetchItem('MLB1615760527');
    expect(resultExpected).toEqual(item);
  });
  it('Testa se a função chamada sem argumento retorna um erro', async () => {
    const resultExpected = await fetchItem();
    expect(resultExpected).toEqual(new Error('You must provide an url'));
  });
});
