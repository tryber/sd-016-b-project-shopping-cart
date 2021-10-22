const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('É uma function', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('É chamada e executada com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Utiliza o endpoint "" quando executada com o argumento "MLB1615760527"', async () => {
    const APIwithId = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(APIwithId);
  });

  it('Retorna uma estrutura igual à de item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('Sem argumento retorna um erro com a mensagem: You must provide an url', async () => {
    await expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });
  
});
