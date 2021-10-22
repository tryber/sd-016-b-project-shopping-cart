const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
 it('testa se fetchProducts é uma função', () => {
   expect(typeof fetchProducts).toBe('function');
 })
 it('teste se fetch foi chamado', () => {
   fetchProducts('computador')
   expect(fetch).toHaveBeenCalled();
 })
 it('se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint',() => {
   const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
   fetchProducts('computador')
   expect(fetch).toHaveBeenCalledWith(endpoint);
})
it('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
  const result = await fetchProducts('computador');
  expect(result).toEqual(computadorSearch);
})
it('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  const expectedError = new Error('You must provide an url');
  const result = await fetchProducts();
  expect(result).toEqual(expectedError);
})
});
