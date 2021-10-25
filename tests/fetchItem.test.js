const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const { id } = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it(' Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    const idItem = 'MLB1615760527';
    fetchItem(idItem);

    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const idItem = 'MLB1615760527';
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem(idItem);

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const results = await fetchItem('MLB1615760527');

    expect(results).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
    const expected = new Error('You must provide an url');
    const results = await fetchItem();

    expect(results).toEqual(expected);
  })
});
