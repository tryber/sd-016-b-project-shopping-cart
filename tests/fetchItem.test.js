const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Teste se fetch foi chamada executando a função fetchItem com o argumento "MLB1615760527"', async () => {
    const fetchCalled = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527" ao chamar a função fetchItem com o argumento "MLB1615760527"', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    const fetchCalled = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo', async () => {
    const fetchCalled = await fetchItem('MLB1615760527');
    expect(fetchCalled).toEqual(item);
  });

});
