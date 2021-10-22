const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Verifica se é uma função', () => {
    const validacao = typeof(fetchItem);
    expect(validacao).toBe('function');
  })

  test('Verifica se fetch está sendo usada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Verifica se fetch está chamando o site certo', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  test('Verifica se fetchItem retorna um objeto igual ao item', async () => {
    const resultado = await fetchItem('MLB1615760527');
    expect(resultado).toEqual(item);
  })

  test('Aparece um erro se a função fetchItem for chamada sem parametro', async () => {
    const resultado = await fetchItem();
    const erroAqui = new Error('You must provide an url');
    expect(erroAqui).toEqual(resultado);
  })
});
