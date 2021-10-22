const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof(fetchItem)).toBe('function');
  });

  test('Testa se fetchItem com o argumento "MLB1615760527" chama fetch', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testa se ao chamar fetchItem com o argumento, a função fetch retorna o endpoint correto', () => {
    expect.assertions(1);
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Testa se retorno da função fetchItem é um objeto igual ao objeto item', async () => {
    expect.assertions(1);
    const search = await fetchItem('MLB1615760527');
    expect(search).toEqual(item);
  });

  test('Testa se retorna erro quando fetchItem é chamada sem argumento', async () => {
    expect.assertions(1);
    const erro = new Error('You must provide an url');
    const search = await fetchItem();
    expect(search).toEqual(erro);
  });
});
