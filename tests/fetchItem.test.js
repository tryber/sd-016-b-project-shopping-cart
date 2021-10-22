const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('1. Testa se é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('2. Testa se a função com argumento e se fetch foi chamada', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });

  it('3. Testa se a função utiliza o endpoint:', () => {
    fetchItem('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('4. Teste se a função com argumento "computador" retorna resultado igual a "computerSearch"', async () => {
    const analyse = await fetchItem('MLB1615760527');
    expect(analyse).toEqual(item);
  });

  it('5. Teste se, ao chamar a função sem argumento, retorna um erro com a mensagem:', async () => {
    const error = 'You must provide an url';
    const analyse = await fetchItem();
    expect(analyse).toEqual(error);

  })
});
