const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se é função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se a função é chamada', () => {
    fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função chamada com argumento ´computador´ utiliza o endpoint ´https://api.mercadolibre.com/sites/MLB/search?q=computador´', () => {
    fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Testa se a função chamada com argumento ´computador´ retorna um objeto igual ao armazenado na constante computadorSearch', async () => {
    const resultExpected = await fetchProducts('computador');
    expect(resultExpected).toEqual(computadorSearch);
  });
  it('Testa se a função chamada sem argumento retorna um erro', async () => {
    const resultExpected = await fetchProducts();
    expect(resultExpected).toEqual(new Error('You must provide an url'));
  });
});
