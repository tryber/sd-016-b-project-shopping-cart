const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  
  it('testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('executa a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada' , () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  it('testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const fetchItemsTest = await fetchItem('MLB1615760527')
    expect(fetchItemsTest).toEqual(item)
  })

  it('testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const fetchItemsTest = await fetchItem()
    const err = new Error('You must provide an url')
    expect(fetchItemsTest).toEqual(err)
  })

});
