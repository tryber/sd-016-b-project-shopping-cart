const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se a função foi chamada retornando o valor enviado como argumento', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função usou o endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Verifica se o retorno da função fetchItem é igual ao mock item', async () => {
    const resultMok = await fetchItem('MLB1615760527');
    expect(resultMok).toEqual(item);
  });

  it('Verifica se a função fetchItem sem argumento retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const resultFetch = await fetchItem();
    expect(resultFetch).toEqual(expectedError);
  });
});
