const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se a fetchProducts é uma função',async () =>{
    expect(fetchProducts).toBeInstanceOf(Function);
  })
  it('Teste se a função fetchProducts é chamda com parametro computador', async () =>{
    const testFetch = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
  it('Testa se ao chamar a função fetchProducts com o argumento "computador", é usado o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const testFetch = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url)
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const testFetch = await fetchProducts('computador');
    expect(testFetch).toEqual(computadorSearch)
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const testFetch = await fetchProducts();
    expect(testFetch).toEqual(new Error ('You must provide an url'));
  })
});
