const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fecthItem é uma função', () => {
    const result = fetchItem;
    expect(typeof (result)).toEqual('function');
  });
  it('Testa se fetch é chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('Testa se fetch utiliza o endpoint adequado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se a função retorna um objeto igual ao item', async () => {
    const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    // função toType para verificar o tipo do elemento retirada de: https://stackoverflow.com/a/23461268/17151937
    const result = await fetchItem('MLB1615760527');
    expect(toType(result)).toEqual(toType(item));
  });
  it('Testa se fetchItem retorna erro se não tiver parâmetro', async () => {
    expect(fetchItem).toThrow('You must provide an url');
  });
});
