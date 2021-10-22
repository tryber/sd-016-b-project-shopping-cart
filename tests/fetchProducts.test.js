const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('1. Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('2.  Executa a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled(); 
    // https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });
  it('3. Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador'); 
  });
  it('4. O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const computer = await fetchProducts('computador');
    expect(computer).toEqual(computadorSearch);
  });
  it('5. Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const expectedError = new Error('You must provide an url');
    const product = await fetchProducts();
     expect(product).toEqual(expectedError); 
  });
});