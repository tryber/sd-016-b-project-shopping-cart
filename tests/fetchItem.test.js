const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('teste se fetchItem é uma função',() => {
    expect(typeof fetchItem).toBe('function')
  });
  test('Execute a função fetchItem com o argumento "computador" e teste se fetch foi chamada',() => {

  })
  test('Teste se, ao chamar a função fetchItem com o argumento "computador", a função fetch utiliza o endpoint ',() => {

  })
  test('Teste se o retorno da função fetchItem com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', () => {

  })
  test('este se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', () => {

  })
});
