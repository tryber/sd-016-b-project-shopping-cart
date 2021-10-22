const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('Teste se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    const fetchTest = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  });
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const fetchTest = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const fetchTest = await fetchProducts('computador');
    expect(fetchTest).toEqual(computadorSearch);
  });
  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchTest = await fetchProducts();
    expect(fetchTest).toEqual(new Error('You must provide an url'));
  });
});
