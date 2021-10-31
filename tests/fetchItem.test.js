const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchItem).toBe('function')
  })

  //test2
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    await fetchItem('MLB1615760527');
    return expect(fetch).toHaveBeenCalled()
  })

  //test3
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    // await fetchItem('MLB1615760527');
    return expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })

  // test4
  it(' Teste se o retorno da função fetchItem com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const fun =  await fetchItem('MLB1615760527')
    return expect(fun).toBe(item)
  })

  // //test5
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url',  () => {
    const fun =  fetchItem();
     expect(fun).toEqual(new Error('You must provide an url'))
  })
  // fail('Teste vazio');
});
