const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('fetchProducts foi chamado com', () => {  
    fetchProducts('computador');  
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao chamar a função fetchProducts com o argumento "computador" ela utiliza o endpoint correto', () => {
    fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  
  it('O retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it('se o parâmetro de fetchProducts for indefinido, devolver erro', async () => {
    const error = new Error('You must provide an url')
    const test = await fetchProducts();
    expect(test).toEqual(error);
  });  
});
