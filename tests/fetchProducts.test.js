const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Verifica se é uma função', () => {
    const validacao = typeof(fetchProducts);
    expect(validacao).toBe('function');
  })

  // consultei o site: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  test('Verifica se fetch está sendo usada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  // consultei o site: https://jestjs.io/pt-BR/docs/expect#tohavebeencalledwitharg1-arg2-
  test('Verifica se fetch está chamando o site certo', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })

  test('Verifica se fetchProducts retorna um objeto igual ao computadorSearch', async () => {
    const resultado = await fetchProducts('computador');
    expect(resultado).toEqual(computadorSearch);
  })

  test('Aparece um erro se a função fetchProducts for chamada sem parametro', async () => {
    const resultado = await fetchProducts();
    const erroAqui = new Error('You must provide an url');
    expect(erroAqui).toEqual(resultado);
  })
});
