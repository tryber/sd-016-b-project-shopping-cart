const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fecthProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  it('fetchProducts chama função quando executada com o argumento "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetchProducts deve utilizar o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" quando utilizado argumento "computador"', async () => {
    expect.assertions(1);
    const expecteedUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expecteedUrl);
  });

  it('fetchProducts deve retornar igual á computadorSearch', async () => {
    expect.assertions(1);
    const teste = await fetchProducts('computador');
    expect(teste).toEqual(computadorSearch.results);
  });

  it('fetchProducts deve retornar um erro quando chamanda sem argumentos', async () => {
    expect.assertions(1);
    const teste = fetchProducts();
    await expect(teste).rejects.toEqual(new Error('You must provide an url'));
  });
});
