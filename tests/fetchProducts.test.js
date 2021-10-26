const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetch foi chamada após executar a função fetchProducts com o argumento "computador"', async () => {
    await fetchProducts('computador');
    /*
    Consultei o link abaixo para entender como testar se uma função foi chamada.
    ref: https://jestjs.io/docs/expect#tohavebeencalled
    */
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    /*
    Consultei o link abaixo para entender como testar se uma função foi chamada com um argumento específico.
    ref: https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-
    */
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const products = await fetchProducts('computador');

    expect(products).toEqual(computadorSearch);
  });

  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', () => {
    /*
    Consultei o link abaixo para entender a sintaxe que deve ser usada ao utilizar o matcher toThrowError.
    ref: https://jestjs.io/docs/expect#tothrowerror
    */
    expect(() => fetchProducts()).toThrowError(new Error('You must provide an url'));
  });
});
