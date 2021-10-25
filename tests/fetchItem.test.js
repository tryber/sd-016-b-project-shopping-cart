const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Verificar se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
    // Utilizei diferente matcher do teste fetchProducts, para visualizar possibilidades.
  });

  test('Veriificar se a função fetchItem é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  test('Veriificar se a função fetchItem com argumento MLB1615760527 possui endpoint: https://api.mercadolibre.com/items/MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527'
    );
  });

  test('Verificar se retorno da função fetchItem é uma estrutura json', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  test('Verificar se retorno da função fetchItem sem parâmetro retorna erro: You must provide an url', async () => {
    const fetch = await fetchItem();
    const error = new Error('You must provide an url');
    expect(fetch).toEqual(error);
  });
});
