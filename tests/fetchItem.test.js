const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Se fetch foi chamada ao executar a função `fetchItem` com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('Se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527".', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const items = await fetchItem('MLB1615760527');
    expect(items).toEqual(item)
  });
});
