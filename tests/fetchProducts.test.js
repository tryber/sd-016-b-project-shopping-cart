const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('1.1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it("1.2 - Ao chamar o argumento computador, testa se fetch foi chamada", () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('1.3 - Ao chamá-la com o argumento computador, testa se fetch foi chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it("1.4 - Testa se o retorno da função é um objeto igual a computadorSearch", async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it("1.5 -Se estiver sem argumento, deve retornar um erro com a mensagem: You must provide an url", async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError)
  });
});
