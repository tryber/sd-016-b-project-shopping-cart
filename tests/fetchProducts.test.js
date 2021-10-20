const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função'), () => {
    expect(typeof fetchProducts).toEqual('function')
  }

  it('Testa se ao colocar o parametro "computador" fetch é chamado'), async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }

  it('Testa se o retorno da função com o parametro "computador" retorna o restudado da constante computadorSearch'), async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetchProducts('computador').toEqual(computadorSearch));
  }

});
