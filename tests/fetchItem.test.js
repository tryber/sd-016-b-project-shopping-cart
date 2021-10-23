const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // requisito 1
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  // requisito 2
  it('testa se aa func foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  // requisito 3
  it('testa o fetch com o endpoint correto', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  // requisito 4
  it('retorno da func é igual a computadorSearch', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  // requisito 5
  it('Sem argumento deve retornar um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
