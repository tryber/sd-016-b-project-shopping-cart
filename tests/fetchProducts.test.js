const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts is function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('fetchProducts have been called', () => {  
    fetchProducts('computador');  
    expect(fetch).toHaveBeenCalled();
  });

  it('which endpoint has been used', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('structure data, is equal to computadorSearch', async () => {
    const test = await fetchProducts('computador');
    expect(test).toEqual(computadorSearch);
  });

  it('if param of fetchProducts is undefined return error', async () => {
    const error = new Error('You must provide an url')
    const test = await fetchProducts();
    expect(test).toEqual(error);
  });  
});
