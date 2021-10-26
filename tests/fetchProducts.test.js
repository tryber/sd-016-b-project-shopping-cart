const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchItem é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  //fail('Teste vazio');
  });
  test('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalled(); 
  })
  test('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador"); 
  })
  test('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const value = await fetchProducts('computador');
    expect(value).toEqual(computadorSearch); 
  })
  test('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const value = await fetchProducts();
    const erro = new Error('You must provide an url')
    expect(value).toEqual(erro); 
  })
})
