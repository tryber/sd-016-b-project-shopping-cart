const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('teste se fecthitem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('teste se com o parametro MLB1615760527, se fecth foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('teste se com o parametro MLB1615760527, utiliza o endpoint esperado', () => {
    fetchItem('MLB1615760527');
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('teste se o retorno da função é um objeto igual a item',async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('deve retornar um erro',async () => {
    const callError = new Error ('You must provide an url');
    const funcResult = await fetchItem();
    expect(funcResult).toEqual(callError);
  });
});
