const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  const endPointID = ' https://api.mercadolibre.com/items/MLB1615760527'
  const id = 'MLB1615760527'
  it('1 - Teste se fetchItem é uma função;', () => {
    const tipo = typeof fetchItem;
    expect(tipo).toBe('function')
  })

  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    await fetchItem(id);
    expect(fetch).toHaveBeenCalled();
  })

  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    expect(fetch).toHaveBeenCalledWith(endPointID);
  })

  it('4- Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchItem(id)).toEqual(item);
  })

  it('5- Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
  })
});
