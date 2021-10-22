const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  test('Testar se fetchProduct é executada quando passado o parâmetro "computador"', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('Testar a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  test('Testar se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', () =>  {
    fetchProducts('computador');
    expect(fetch).toEqual(computadorSearch);
  })

  test('Testar se, ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', () => {
    const fetchWithoutArg = fetchProducts();
    const error = new Error('You must to provide an url')
    expect(fetchWithoutArg).toEqual(error);
  });
});