const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('1 - fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  
  test('2 - fetch é chamada com fetchProducts("computador")', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('3 - Verifica o endpoint de fetch', () => {
    expect.assertions(2);
    const urlTestYes = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const urlTestNot = 'https://api.mercadolibre.com/sites/MLB/search?q=outraCoisa';
    
    expect(fetch).toHaveBeenCalledWith(urlTestYes);
    expect(fetch).not.toHaveBeenCalledWith(urlTestNot);
  });

  test('4 - Retorno de fetchProducts similar a computadorSearch', async () => {
    expect.assertions(4);

    expect(await fetchProducts('computador')).toBe(computadorSearch);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
    expect(await fetchProducts()).not.toBe(computadorSearch)
    expect(await fetchProducts()).not.toEqual(computadorSearch);
  });

  test('5 - Retorna erro: You must provide an url', async () => {
    expect.assertions(2);
    const errorMessage = new Error('You must provide an url');
    expect(await fetchProducts()).toEqual(errorMessage);
    expect(await fetchProducts()).not.toEqual('qualquerCoisa');
  });
});
