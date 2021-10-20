const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    const products = await fetchProducts('computador');

    expect(fetch).toHaveBeenCalled();
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  })

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
    const products = await fetchProducts('computador');
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    expect(fetch).toHaveBeenLastCalledWith(URL);
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeenlastcalledwitharg1-arg2-
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    expect.assertions(1);
    const products = await fetchProducts('computador');

    expect(products).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    const products = await fetchProducts();

    expect(products).toEqual(new Error('You must provide an url'));
  });
});
