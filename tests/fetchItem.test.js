const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function)
  });

  it('Testar se fetchItem é executada quando passado o parâmetro "MLB1615760527"', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toBeCalled()
  });

  it('Testar a função fetchItems com o argumento "MLB1615760527"', async () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Testar se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto "item"', async () =>  {
    const oi = await fetchItem('MLB1615760527');
    expect(oi).toEqual(item);
  })

  it('Testar se, ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchWithoutArg = await fetchItem();
    const error = new Error('You must provide an url')
    expect(fetchWithoutArg).toEqual(error);
  });
});
