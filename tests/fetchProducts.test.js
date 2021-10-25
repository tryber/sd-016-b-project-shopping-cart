const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
 it('1- Verifica se fetchProducts é uma função', () => {
  expect(fetchProducts).toBeInstanceOf(Function)
 });

 it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
  fetchProducts('computador')
  expect(fetch).toHaveBeenCalled()
 });
 it('3- Testa se a função utiliza o endpoint:', () => {
  fetchProducts('computador')
  expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
});

it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
  const result = await fetchProducts('computador');
  expect(result).toEqual(computadorSearch.results);
});

it('5 - Teste se, ao chamar a função sem argumento, retorna um erro com a mensagem', async () => {
  const error = 'You must provide an url';
  const result = await fetchProducts();
  expect(result).toEqual(error);
})

});

