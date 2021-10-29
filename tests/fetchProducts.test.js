const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('teste se ao executar a função fetchProducts("computador"), fetch é chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('teste se ao chamar a função fetchProducts("computador"), fetch utiliza o endpoint determinado', () => {
    const myEndpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(myEndpoint);
  });
  it('teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const resultFetchProducts = await fetchProducts('computador');
    expect(resultFetchProducts).toEqual(computadorSearch);
  });
  it('teste se ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
    const errorMessage = new Error('You must provide an url');
    const resultFetch = await fetchProducts();
    expect(resultFetch).toEqual(errorMessage);
  });
});
