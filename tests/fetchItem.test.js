const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('', async () => {
    const response = await fetchItem('MLB1615760527')
    const responseError = await fetchItem()
    const error = new Error('You must provide an url')
    expect.assertions(5);

    expect(fetchItem).toBeInstanceOf(Function)
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
    expect( await fetchItem('MLB1615760527')).toEqual(item)
    expect(responseError).toEqual(error)
    
  })
});
