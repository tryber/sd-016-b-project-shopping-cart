const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se é uma função', () =>{
    expect(typeof fetchItem).toBe('function');
  })
  it('Ao executar a função, teste se o fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('Testa se a função com argumento, retorna o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('Testa se o retorno da função é item', async () => {
    const returned = await fetchItem('MLB1615760527');
    expect(returned).toEqual(item);
  })
  it('Testa erros se não houver argumento', async () => {
 const error = new Error ('You must provide an url');
 const result = await fetchItem();
 expect(result).toEqual(error);
  })
});
