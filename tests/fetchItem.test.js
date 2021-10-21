const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  test('fetchItem deve chamar a função fetch quando executada com o argumento "MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('fetchItem deve chamar a função fetch e utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527" quando executada com o argumento "MLB1615760527"', async () => {
    expect.assertions(1);
    const expectedQueryUrl = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedQueryUrl);
  });

  test('fetchItem deve retornar uma estrutura igual à de item', async () => {
    expect.assertions(1);
    const actual = await fetchItem('MLB1615760527');
    expect(actual).toEqual(item);
  });

  test('fetchItem deve retornar um erro com a mensagem: "You must provide an url" quando chamada sem argumentos.', () => {
    expect.assertions(1);
    expect(() => fetchItem()).toThrow(new Error('You must provide an url'));
  });
});
