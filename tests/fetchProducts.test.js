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

  })
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint ',() => {

  })
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', () => {

  })
  test('este se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', () => {

  })
});
