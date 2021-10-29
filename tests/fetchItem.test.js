const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se a fetchItem é uma função',async () =>{
    expect(fetchItem).toBeInstanceOf(Function);
  })
  it('Teste se a função fetchItem é chamda com parametro MLB1615760527', async () =>{
    const testFetch = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled()
  })
  it('Testa se ao chamar a função fetchItem com o argumento "MLB1615760527", é usado o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const testFetch = await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(url)
  })
  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const testFetch = await fetchItem('MLB1615760527');
    expect(testFetch).toEqual(item)
  })
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const testFetch = await fetchItem();
    expect(testFetch).toEqual(new Error ('You must provide an url'));
  })

});
