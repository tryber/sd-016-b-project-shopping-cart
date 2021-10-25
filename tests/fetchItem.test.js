const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Se é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });

  test('Se a função fetch é chamada', async() => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Se fetch tem o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  })

  test('Se o retorno se iguala a item', async () => {
    const current = await fetchItem('MLB1615760527');
    expect(current).toEqual(item);
  })

  test('Se a função sem argumento retorna um erro', async () => {
    await expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  }) 

});
