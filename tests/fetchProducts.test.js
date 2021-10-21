const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('fecthProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Run fetchProducts as argument "computador" and test it has been invoke', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  
  it('When invoke fetchProducts function with the argument "computador", function uses the endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Return from "fetchProducts" with argument "computador" is a data structure equal to the object', async() => {
    const productFetchTest = await fetchProducts('computador');
    expect(productFetchTest).toEqual(computadorSearch);
  });

  it('When calling "fetchProducts" without argument, it returns as error: "You must provide a url"', async() => {
    const productFetchTest = await fetchProducts();
    const error = new Error('You must provide a url');
  });
});