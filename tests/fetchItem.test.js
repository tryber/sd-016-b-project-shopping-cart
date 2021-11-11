const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('fetchItem foi chamado', () => {  
    fetchItem('MLB1615760527');  
    expect(fetch).toHaveBeenCalled();
  });

  it('A endpoint foi usada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('dados da estrutura é igual ao item', async () => {
    const test = await fetchItem('MLB1615760527');;
    expect(test).toEqual(item);
  });

  it('se o parâmetro de fetchItem for indefinido, devolver erro', async () => {
    const error = new Error('You must provide an url')
    const test = await fetchItem();
    expect(test).toEqual(error);
  });
});
