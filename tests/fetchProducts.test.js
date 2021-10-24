const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  //Teste #1
  it('Check if fetchProduct is a function', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  //Teste #2
  it('Check if fetch is called', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  //Teste #3
  it('Check if endpoint with argument Computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  //Teste #4
  it('Check if return of function fetchProducts, to be equal computadorSearch', async () => {
    const testFetch = await fetchProducts('computador');
    expect(testFetch).toEqual(computadorSearch);
  });
  //Teste #5
  // it('Check if return of function FetchProducts without parameter, provide an url', async () => {
  //   const testFetchWithoutArgument = await fetchProducts();
  //   const error = new Error('You must provide an url');
  //   expect(testFetchWithoutArgument).toEqual(error);
  // });
});
