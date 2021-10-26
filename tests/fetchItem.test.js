const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('teste se fetchItem é uma função',() => {
    expect(typeof fetchItem).toBe('function')
  });
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada',() => {
    fetchItem("MLB1615760527")
    expect(fetch).toBeCalled()
  })
  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"',() => {
    fetchItem("MLB1615760527")
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527")
  })
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const { id, title, price } = item;
    const items = {sku: id, name: title, salePrice: price}
    const fetched = await fetchItem("MLB1615760527");
    expect(fetched).toEqual(items)
  })
  test('este se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try{
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
