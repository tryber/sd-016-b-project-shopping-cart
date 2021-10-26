const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('teste se fetchProducts é uma função',() => {
    expect(typeof fetchProducts).toBe('function')
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada',() => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  })
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint ',() => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const fetched = await fetchProducts('computador');
    expect(fetched).toEqual(computadorSearch.results);
  })
  test('este se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try{
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
});
})
