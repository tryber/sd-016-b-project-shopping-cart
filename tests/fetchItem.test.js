const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('testando se fecthItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

//test 02 
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });

  //test 03
  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza um endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  });

  //test 04
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const objeto = await fetchItem('MLB1615760527')
    expect(objeto).toEqual(item)
  });

  //test 05
  test('este se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const intemFetche = await fetchItem()
    const erro = new Error('You must provide url')
    expect(intemFetche).toEqual(erro)
  })
});
