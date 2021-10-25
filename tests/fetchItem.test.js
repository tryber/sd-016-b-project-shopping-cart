const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('1 - Teste se `fetchItem` é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });
  
  it('2 - Execute a função `fetchItem` com o argumento do item "MLB1615760527" e teste se `fetch` foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('3 - Teste se, ao chamar a função `fetchItem` com o argumento do item "MLB1615760527", a função `fetch` utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('4 - Teste se o retorno da função `fetchItem` com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto `item` que já está importado no arquivo', async () => {
    const testFetch = await fetchItem('MLB1615760527');
    expect(testFetch).toEqual(item);
  });
});
