const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it(('Testa se fetchProducts é uma função'), () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it(('Testa se ao colocar o parametro "computador" fetch é chamado'), async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se o endpoint é acessado é o correto quando utilizado o argumento computador', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it(('Testa se o retorno da função com o parametro "computador" retorna o restudado da constante computadorSearch'), async () => {
    expect.assertions(1);
    const testezinhoLindo = await fetchProducts('computador');
    expect(testezinhoLindo).toEqual(computadorSearch);
  });

  it(('Teste se ao chamar a função sem argumento um erro é retornado'), async() => {
    const error = new Error('You must provide an url')
    // try {
      const result = await fetchProducts();
    // }
    // catch {
      expect(result).rejects.toEqual(new Error('You must provide an url'))
    // }
  });
});
