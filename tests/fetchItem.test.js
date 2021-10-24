const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verificar se fetchItem é uma function', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verificar se "fetch" é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verificar se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Verificar se, o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Verificar se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
