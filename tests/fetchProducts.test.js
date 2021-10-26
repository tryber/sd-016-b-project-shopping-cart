const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função;', () => {
  expect(fetchProducts).toBeInstanceOf(Function) });

  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()});

  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint:', () => {
      fetchProducts('computador')
      expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
    });

    it('4 - Teste se a função com argumento "computador" retorna resultado igual a "computerSearch"', async () => {
      const getDatas = await fetchProducts('computador');
      expect(getDatas).toEqual(computadorSearch.results);
    });

    it('5 - Teste se, ao chamar a função sem argumento, retorna um erro com a mensagem:',  () => {
      expect(fetchProducts()).toEqual('You must provide an url');
    })
});
