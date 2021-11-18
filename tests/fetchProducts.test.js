const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

// REFERÊNCIAS PARA REALIZAR OS TESTES //
// https://jest-bot.github.io/jest/docs/expect.html // 

describe('1 - Teste se fecthProducts é uma função', () => {
  
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Teste se o retorno da função fetchProduct("computador") é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const fnc = await fetchProducts('computador');
    expect(fnc).toEqual(computadorSearch)
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  const fn = await fetchProducts();
  const error = new Error('You must provide an url')
    expect(fn).toEqual(error);
  });
  // fail('Teste vazio');
});
