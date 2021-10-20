const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', async () =>{
    expect(fetchProducts).toBeInstanceOf(Function); 
  })

  it('teste se fetch foi chamada quando o parametro computador foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
});
