const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts e uma funcao', async () => {
    expect.assertions(2);
    const fetchProductsFunction = await fetchProducts
    expect(fetchProductsFunction).toBeDefined();
    expect(typeof fetchProductsFunction).toBe('function');
  })
  it('Testa se fetch foi chamada quando computador e passado como argumento', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  it('Testa se ao chamar a funcao com argumento computador fetch utiliza o endpoint correto', async () => {
    const correctEndPoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(correctEndPoint)
  })
});
