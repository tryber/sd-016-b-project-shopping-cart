const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('1.1 - Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  it('1.2 - Execute a função fetchProducts com o argumento "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  
  it('1.3 - Ao chamá-la com o argumento computador, testa se fetch foi chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  
  it('1.4 - Testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  
  it('1.5 - Se estiver sem argumento, deve retornar um erro com a mensagem: You must provide an url', async () => {
    const err = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(err);
  });
});
