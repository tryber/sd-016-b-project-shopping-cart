const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('teste se é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('teste se fetch foi chamada ao executar a função fetchItem com o argumento do item "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const itemId = 'MLB1615760527'
    await fetchItem(itemId);
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${itemId}`);
  });

  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', () => {
    expect(() => fetchItem()).toThrow(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
