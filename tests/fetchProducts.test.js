const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts é uma função?', async () => {
    const fetchFunction = fetchProducts; 
    expect(typeof fetchFunction).toBe('function');
  })
  it('fetch foi chamada com computador como argumento?', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('fetchProducts recebe endpoint correto?', async () => {
    await fetchProducts('computador');
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('retorno da função está correto?', async () => {
    const funcReturn = await fetchProducts('computador');
    const expectReturn = computadorSearch.results;
    expect(funcReturn).toEqual(expectReturn);
  })
  it('A função sem argumento retorna um erro?', async () => {
    try {
      await fetchProducts()
    } catch (error) {
      expect(error).toEqual(new Error ('You must provide an url'));
    }
  })
});
