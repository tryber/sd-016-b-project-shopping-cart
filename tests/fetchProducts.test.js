const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('É uma function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('É chamada e executada com o argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" quando executada com o argumento "computador"', async () => {
    const Url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(Url);
  });

  it('Retorna uma estrutura igual à de computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch.results);
  });

  it('Sem argumento retorna um erro com a mensagem: You must provide an url', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
  
});
