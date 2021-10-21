const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('Testa se fetchProducts é uma função',async ()=>{
    const result = await fetchItem
    expect(result).toBeInstanceOf(Function);
  })


  it('checa se fetch foi chamada',async ()=>{
    const result = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })

  it(' verifica endpoint',async ()=>{
    const result = await fetchItem('MLB1615760527')
    expect(result.id).toEqual('MLB1615760527');
  })

  it(' verifica retorno',async ()=>{
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  })

  it(' verifica retorno',async ()=>{
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  })

  it(' verifica erro , ao nao passar agumentos',async ()=>{
    const result = await fetchItem()
    expect(result).toMatch('You must provide an url');
  })
});
