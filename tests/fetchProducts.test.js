const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// const { Assertion, expect } = require('chai');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // expect.assertions(5);
  //test 01
test('testando se fecthProducts é uma função', () => {
  expect(typeof fetchProducts).toBe('function')
});

// test 02
test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
  await fetchProducts('computador')
  expect(fetch).toHaveBeenCalled();
});

//test 03
test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada com a url correta', async () => {
  await fetchProducts('computador')
  expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
})

//test 04 
test("Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch,", async () => {
  const objeto = await fetchProducts('computador')
  expect(objeto).toEqual(computadorSearch.results);
})

//test 05  
test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  const productFetch = await fetchProducts();
  const erro = new Error('You must provide url')
  expect(productFetch).toEqual(erro);
})
  // fail('Teste vazio');
});
