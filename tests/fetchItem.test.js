const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch foi chamada após executar a função fetchItem com o argumento do item "MLB1615760527"', async () => {
    const itemInfo = await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const itemInfo = await fetchItem('MLB1615760527');

    fetch('https://api.mercadolibre.com/items/MLB1615760527')
      .then((response) => response.json())
      .then((data) => {
        expect(itemInfo).toEqual(data);
      });
  });

  it(' Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const itemInfo = await fetchItem('MLB1615760527');

    expect(itemInfo).toEqual(item);
  });

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(() => fetchItem()).toThrowError(new Error('You must provide an url'));
  });
});
