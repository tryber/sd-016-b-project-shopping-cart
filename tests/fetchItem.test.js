const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  beforeEach(async () => itemResult = await fetchItem('MLB1615760527'));

  it('Teste se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    expect.assertions(1);

    expect(fetch).toHaveBeenCalled();
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });

  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    expect.assertions(1);
    const URL = 'https://api.mercadolibre.com/items/MLB1615760527';

    expect(fetch).toHaveBeenLastCalledWith(URL);
    // Credits: https://jestjs.io/pt-BR/docs/expect#tohavebeenlastcalledwitharg1-arg2-
  });

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', () => {
    expect.assertions(1);

    expect(itemResult).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = await fetchItem();

    expect(error).toEqual(new Error('You must provide an url'));
  });
});
