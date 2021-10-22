const fetchSimulator = require('../mocks/fetchSimulator');
const {
  fetchItem
} = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
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
  it('Teste 01:  Teste se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toHaveBeenCalled para garantir que uma função
  // de simulação (mock, em inglês) foi chamada.
  // **********************************************************************
  it('Teste 02: Teste a execucao da funcao fecthItem parassando "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toHaveBeenCalledWith para garantir que uma função 
  // de simulação (mock, em inglês) foi chamada com argumentos específicos.
  // **********************************************************************
  it('Teste 03: Teste se ao chamar fetchItem passando "MLB1615760527" a função utiliza url da API em referencia', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527');

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
  it('Teste 04: Testar o retorno da funcao fitchItem quando passado parametro é igual a uma estrutura igual ao objeto item importado no arquivo', async () => {
    const itemFetch = await fetchItem('MLB1615760527');
    expect(itemFetch).toEqual(item);
  });

  // **********************************************************************
  // DOCUMENTATION: https://jestjs.io/pt-BR/docs/expect#toequalvalue
  // **********************************************************************
  // BREVE DESCRIÇÃO:Use .toEqual para comparar recursivamente todas as 
  // propriedades de instâncias de objeto (também conhecido como igualdade 
  // "profunda"). Ele chama Object.is para comparar valores primitivos, 
  // o que é ainda melhor para teste do que o operador de igualdade estrita
  //  ===.
  // OBSERVAÇÃO IMPORTANTE: Nessa função em particular o que temos de diferente
  // do toEqual que é utilizado para com comparar funções, objetos, e valore e 
  // propriedades de objetos... é que criei uma constante para capturar um erro 
  // disparado por uma throw no momento que a função fetchItem for invocada
  // sem passar o parâmetro esse erro está tratado na função fetchItem.js numa
  // estrutura condicional simples if 
  //****************************************************************************** 
  it('Teste 05: Verificar se ao invocar a função fetchItem sem paramettro ela retorna uma erro ', async () => {
    const itemFetch = await fetchItem();
    const erro = new Error('You must provide an url');
    expect(itemFetch).toEqual(erro);
  });

});