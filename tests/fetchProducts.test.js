const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', async () =>{
    expect(fetchProducts).toBeInstanceOf(Function); 
  })
  it('teste se fetch foi chamada quando o parametro computador foi chamado', async () => {
    const fetchTest = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
  it(' Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const fetchTest = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url);
  })
})
