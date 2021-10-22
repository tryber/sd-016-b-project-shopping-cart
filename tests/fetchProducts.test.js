const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  
  it('se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('executa a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"' , () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  it('testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const fetchProductsTest = await fetchProducts('computador')
    expect(fetchProductsTest).toEqual(computadorSearch)
  })

  it('testa se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchProductsTest = await fetchProducts()
    const err = new Error('You must provide an url')
    expect(fetchProductsTest).toEqual(err)
  })

});
