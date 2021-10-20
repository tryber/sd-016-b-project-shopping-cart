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
  it('Testa se o retorno da fetchProducts esta correto', async () => {
    const expected = await fetchProducts('computador');
    const functionResult = await fetchProducts('computador');
    expect(functionResult).toEqual(expected)
  })
  it('Testa se o retorno da fetchProducts sem argumento e um erro', async () => {
    try {
      await fetchProducts()
    }
    catch(error){
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
