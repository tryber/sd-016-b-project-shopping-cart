const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('deve chamar fetch ao ser chamada com o argumento de um item', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('deve chamar fetch com o endpoint correto ao ser chamada com o argumento de um item', () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(expectedEndpoint);
  });

  it('deve retornar uma estrutura de dados igual ao objeto "item", ao ser chamada com o argumento de um item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('deve retornar uma mensagem de erro ao ser chamada sem argumentos', async () => {
    const result = await fetchItem();
    const expectedResult = new Error('You must provide an url');
    expect(result).toEqual(expectedResult);
  })
});
