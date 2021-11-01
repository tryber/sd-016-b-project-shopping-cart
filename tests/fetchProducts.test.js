const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  it ('Está definida como uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Invoca a função fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Invoca a função fetch com o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Retorna um objeto com os dados da resposta da requisição', async () => {
    const actual = await fetchProducts('computador');

    expect(actual).toEqual(computadorSearch);
  });

  it('Retorna o erro "You must provide an url" se invocada sem argumento', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
