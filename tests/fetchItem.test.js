const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fecthItem e uma funcao', async () => {
    expect.assertions(2);
    const fetchItemFunction = await fetchItem
    expect(fetchItemFunction).toBeDefined();
    expect(typeof fetchItemFunction).toBe('function');
  })
  it('Testa se fetch foi chamada quando MLB1615760527 e passado como argumento', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('Testa se ao chamar a funcao com argumento MLB1615760527 fetch utiliza o endpoint correto', async () => {
    const correctEndPoint = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(correctEndPoint)
  })
  it('Testa se o retorno da fecthItem esta correto', async () => {
    const expected = await fetchItem('MLB1615760527');
    const functionResult = await fetchItem('MLB1615760527');
    expect(functionResult).toEqual(expected)
  })
  it('Testa se o retorno da fecthItem sem argumento e um erro', async () => {
    try {
      await fetchItem()
    }
    catch(error){
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
