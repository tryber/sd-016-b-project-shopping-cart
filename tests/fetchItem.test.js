const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Testa se fetchItem é uma função', () => {
    expect( typeof(fetchItem) ).toBe('function');
  });

  it('testa se ao executar a função fetchItem com o argumento "MLB1615760527" a fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect( fetch ).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint', () => {
    fetchItem('MLB1615760527');
    expect( fetch ).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

    it('Testa se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
      const products = await fetchItem('MLB1615760527');
      expect( products ).toEqual(item);
  });

    it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
      const products = await fetchItem();
      const erro = new Error('You must provide an url');
      expect( products ).toEqual(erro);
  });
  fail('Teste vazio');
});
