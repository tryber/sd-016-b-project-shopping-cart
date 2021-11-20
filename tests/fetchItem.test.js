const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Checa se fetchItem é uma função', async () => {
    const fetchFunction = fetchItem; 
    expect(typeof fetchItem).toBe('function');
  })
  it('Checa se fetch foi chamada com computador como argumento', async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  })
  it('Checa a função fetchItem recebe endpoint correto', async () => {
    await fetchItem("MLB1615760527");
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Checa se o retorno da função está correto', async () => {
    const funcReturn = await fetchItem("MLB1615760527");
    const expectReturn = item;
    expect(funcReturn).toEqual(expectReturn);
  })
  it('Checa se ao chamar a função sem argumento retorna um erro', async () => {
    try {
      await fetchItem()
    } catch (error) {
      expect(error).toEqual(new Error ('You must provide an url'));
    }
  })
})
