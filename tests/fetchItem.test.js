const fetchSimulator = require('../mocks/fetchSimulator');
const fetchItem = require('../helpers/fetchItem');
const item = require('../mocks/item');
const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

window.fetch = jest.fn(fetchSimulator);

const test = fetchItem();

describe('2 - Teste a função fetchItem', () => {
  it('Deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Deve chamar a função fetch', () => {
    const itemId = 'MLB1615760527';

    fetchItem(itemId);
    expect(fetch).toHaveBeenCalled();
  });

  it('Deve chamar a função fetch com o endpoint correto', () => {
    const itemId = 'MLB1615760527';
    const endpoint = `https://api.mercadolibre.com/items/${itemId}`;

    fetchItem(itemId);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Deve retornar um objeto com os dados da resposta da requisição', async () => {
    const itemId = 'MLB1615760527';
    const received = await fetchItem(itemId);

    expect(received).toEqual(item);
  });

  it('Deve retornar o erro "You must provide an url" se invocada sem argumentos', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
