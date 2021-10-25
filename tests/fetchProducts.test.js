const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });

  it('Testar se fetchProduct é executada quando passado o parâmetro "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  it('Testar a função fetchProducts com o argumento "computador"', async () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('Testar se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () =>  {
    const oi = await fetchProducts('computador');
    expect(oi).toEqual(computadorSearch.results);
  })

  it('Testar se, ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchWithoutArg = await fetchProducts();
    const error = new Error('You must provide an url')
    expect(fetchWithoutArg).toEqual(error);
  });
});