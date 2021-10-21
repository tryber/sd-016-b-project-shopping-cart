const fetchSimulator = require('../mocks/fetchSimulator');
const {
  fetchProducts
} = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

// ************************************** 
// QUESTÃO 01 : REQUISITOS DOS TESTES  //
// **************************************
// OBSERVAÇÃO IMPORTANTE: Observe que em teste ASSÍNCRONOS onde eu deveria 
// utilizar [fetchProducts] que é minha função que faz referência ao servidor 
// (end Point) da API do merado livre estou ulitzando [fetch] exataemente por 
// que estou utilizando uma função mock (Uma espécie de sevidor fake)
describe('1 - Teste a função fecthProducts', () => {
  // **************************************************************
  // DOCUMENTATION: https://github.com/facebook/jest/issues/5946
  //***************************************************************
  // BREVE DESCRIÇÃO:Use .toBeInstanceOf(Class) para verificar 
  // que um objeto é uma instância de uma classe. Este "matcher"
  // usa instanceof por debaixo.
  // OBERSERVAÇÃO IMPORTANTE: Sabendo que fetchProducts é uma 
  // Função e que uma função no javaScript é um "Objeto" então 
  // podemos testar se fetchProducts é uma Função
  // *************************************************************
  it('Teste 01: Verificar se fetchProducts é uma função ', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toHaveBeenCalled para garantir que uma função
  // de simulação (mock, em inglês) foi chamada.
  // **********************************************************************
  it('Teste 02: Verificar se foi chamada a funcao fetchProducts passando como argumento (computador) ', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toHaveBeenCalledWith para garantir que uma função 
  // de simulação (mock, em inglês) foi chamada com argumentos específicos.
  // **********************************************************************
  it('Teste 03: Verificar se quando invocar a fetchProducts com parametro computador, a funcao usa endPoin X', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#toequalvalue
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toEqual para comparar recursivamente todas as 
  // propriedades de instâncias de objeto (também conhecido como igualdade 
  // "profunda"). Ele chama Object.is para comparar valores primitivos, 
  // o que é ainda melhor para teste do que o operador de igualdade estrita
  //  ===.
  // OBSERVAÇÃO IMPORTANTE: Ambas as funções devem retornar  um json identico
  // com propriedades identicas daí to equal é uma boa chamada para este caso 
  // **********************************************************************
  it('Teste 04: Verificar se o retorno da function fetchProducts(arg) é estruturalmente igual à computadorSearch', async () => {
    const productsFetch = await fetchProducts('computador');
    expect(productsFetch).toEqual(computadorSearch);
  });


});