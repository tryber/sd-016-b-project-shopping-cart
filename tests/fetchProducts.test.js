const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

// eslint-disable-next-line max-lines-per-function
describe('1 - Testando a função fecthProducts', () => {
  it('1.1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // eslint-disable-next-line max-len
  it('1.2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('1.3 - utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', () => {
    // eslint-disable-next-line semi
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('1.4 - estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('1.5 - sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const err = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(err);
  });
});