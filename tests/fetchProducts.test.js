const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });

  test('Teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se a função fetch utiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('Teste 4', async () => {
    const valorAtual = await fetchProducts('computador');
    expect(valorAtual).toEqual(computadorSearch);
  });

  test('Se a função retorna erro', async () => {
    const productFetch = await fetchProducts();
    const erro = new Error('You must provide an url');
    expect(productFetch).toEqual(erro);
  });

});
