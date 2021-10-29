const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  
  test('1. Teste se fetchItem é uma função?', () => {
    expect.assertions(1);
    expect(fetchItem).toBeInstanceOf(Function)
  });

  test('2. Teste se fetchItem com parametro \'MLB1615760527\' chama fetch', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('3. Teste se, ao chamar a função fetchItem com o argumento do item \"MLB1615760527\", a função fetch utiliza o endpoint \"https://api.mercadolibre.com/items/MLB1615760527\"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('4. Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto \"item\" que já está importado no arquivo.', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527').then((c) => expect(c).toEqual(item));
  });

  test('5. Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', () => expect(() => fetchItem())
  .toThrowError(/You must provide an url/));

});
