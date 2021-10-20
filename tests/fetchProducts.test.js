const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', () => {
    expect( typeof(fetchProducts) ).toBe('function');
  });

  it('testa se ao executar a função fetchProducts com o argumento "computador" a fetch é chamada', () => {
    fetchProducts('computador');
    expect( fetch ).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', () => {
    fetchProducts('computador');
    expect( fetch ).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

    it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
      const products = await fetchProducts('computador');
      expect( products ).toEqual(computadorSearch);
  });

    it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
      const products = await fetchProducts();
      const erro = new Error('You must provide an url');
      expect( products ).toEqual(erro);
  });
});
