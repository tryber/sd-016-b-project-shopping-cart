const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  
  it('Verifica se ao chamar fetchProducts com o argumento computador a função fetch é chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar fetchProducts com o argumento computador a função fetch utiliza o endpoint correto', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('Verifica se retorna o objeto corretamente ao chamar com o argumento computador', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })

  it('Verifica se ao chamar a função sem parâmetros retorna um erro', async () => {
    const getFetchProducts = await fetchProducts();
    const newError = new Error('You must provide an url');

    expect(getFetchProducts).toEqual(newError);
  })
});
