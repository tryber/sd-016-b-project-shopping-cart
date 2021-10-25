const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Teste se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })

  test('Execute a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada', async () => {
    const fetchTest = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const fetchTest = await fetchItem('MLB1615760527');
    const url = "https://api.mercadolibre.com/items/MLB1615760527"
    expect(fetch).toHaveBeenCalled(url)
  })

  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const fetchTest = await fetchItem('MLB1615760527');
    expect(fetchTest).toEqual(item)
  })

  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchTest = await fetchItem();
    expect(fetchTest).toEqual(new Error('You must provide an url'));
  });
})
