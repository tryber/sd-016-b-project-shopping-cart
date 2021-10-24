const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  const idItem = 'MLB1615760527';
  test('se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  test('se fetch foi chamada, quando a função fetchItem("MLB1615760527") é chamada', async () => {
    expect.assertions(1);
    await fetchItem(idItem);
    expect(fetch).toHaveBeenCalled();
  });

  test('ao chamar a função fetchItem("MLB1615760527"), a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    const url = `https://api.mercadolibre.com/items/${idItem}`;
    await fetchItem(idItem);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('se a função fetchItem("MLB1615760527") é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    const original = await fetchItem(idItem);
    expect(original).toEqual(item);
  });

  test('se chamar a função fetchItem sem argumento, retorna um erro: You must provide an url', () => {
    expect.assertions(1);
    expect(() => fetchItem()).toThrow(new Error('You must provide an url'));
  });

});
