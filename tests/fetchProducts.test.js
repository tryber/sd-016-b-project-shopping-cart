const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// const item = require('../mocks/search');
// const  showData  = require('../script');
// const fetch = require("node-fetch");



window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  //test1
  it('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  //test2
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    await fetchProducts('computador' );
    return expect(fetch).toHaveBeenCalled()
  })

  //test3
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    await fetchProducts('computador' );
    return expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })

  // test4
  it(' Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const fun =  await fetchProducts('computador')
    return expect(fun).toEqual(computadorSearch)
  })

  // //test5
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url',  () => {
    const fun =  fetchProducts();
     expect(fun).toEqual(new Error('You must provide an url'))
  })
  // fail('Teste vazio');


});
