const fetchSimulator = require('../mocks/fetchSimulator');
const fetchItem = require('../helpers/fetchItem');
const item = require('../mocks/item');
const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

window.fetch = jest.fn(fetchSimulator);

const test = fetchItem();

describe('2 - Teste a função fetchItem', () => {
  it('Teste a função fetchItem', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Sem argumento, retorna o erro: You must provide an urls', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });

    it('Deve chamar a função fetch com o endpoint correto', () => {
    const itemId = 'MLB1615760527';
    const endpoint = `https://api.mercadolibre.com/items/${itemId}`;

    fetchItem(itemId);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
});