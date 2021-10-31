const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('teste se ao chamar a função fetchItem("MLB1615760527"), fetch é chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('teste se ao chamar a função fetchItem("MLB1615760527"), fetch utiliza o endpoint determinado', () => {
    const myEndpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(myEndpoint);
  });
  it('teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const resultFetchItem = await fetchItem('MLB1615760527');
    expect(resultFetchItem).toEqual(item);
  });
  it('teste se ao chamar a função fetchItem sem argumento, retorna um erro', async () => {
    const errorMessage = new Error('You must provide an url');
    const resultFetch = await fetchItem();
    expect(resultFetch).toEqual(errorMessage);
  });
});
