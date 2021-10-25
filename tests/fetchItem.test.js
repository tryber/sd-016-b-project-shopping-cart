const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste se a função fecthItem', () => {
  it('é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('foi chamada com o argumento MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('foi chamada com o argumento MLB1532308540', () => {
    fetchItem('MLB1532308540');
    expect(fetch).toHaveBeenCalled();
  });
  it('utiliza o ENDPOINT esperado', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('utiliza o ENDPOINT esperado', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1532308540'
    fetchItem('MLB1532308540');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('retorna um objeto igual a item ao receber o argumento MLB1615760527', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item)
  });
  it('retorna uma mensagem de erro "You must provide an url" caso não receba nenhum parâmetro', async () => {
    const results = await fetchItem();
    const expectedError = new Error ('You must provide an url');
    expect(results).toEqual(expectedError)
  });
});
