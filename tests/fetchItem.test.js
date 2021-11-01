const fetchSimulator = require('../mocks/fetchSimulator');
const fetchItem = require('../helpers/fetchItem');
const item = require('../mocks/item');
const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

window.fetch = jest.fn(fetchSimulator);

const test = fetchItem();

describe('2 - Teste a função fecthItem', () => {
  
  it('1 - Teste se fetchItem é uma função;', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })
  it('1.2 - Verificar se o fetchProducts.js é realmente uma Function:', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    expect.assertions(1)
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    expect.assertions(1)
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('4- Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })

  it('5- Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
  })
});