const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

const id = 'MLB1615760527';

describe('2 - Teste a função fecthItem', () => {
  // Teste se fetchItem é uma função;
  it('testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  // Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;
  it('testa se fetchItem foi chamada utilizando o argumento "computador"', () => {
    fetchItem(id);
    expect(fetch).toHaveBeenCalled();
  });

  //Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";
  it('testa se fetch utiliza endpoint correspondente ao argumento "MLB1615760527" atribuído a fetchItem', () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    fetchItem(id);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  //Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.
  it('testa o retorno da função fetchItem utilizando o argumento "MLB1615760527" é igual aos dados do objeto item', async () => {
    const item = await fetchItem(id);
    expect(item).toEqual(item);
  });

  //Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.
  it('testa se retorna um erro com uma mensagem ao chamar a função sem argumento', async () => {
    const expError = new Error('You must provide an url');
    const value = await fetchItem();
    expect(value).toEqual(expError);
  });
});
