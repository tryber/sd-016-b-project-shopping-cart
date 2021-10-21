const fetchSimulator = require('../mocks/fetchSimulator');
const {
  fetchProducts
} = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  //https://github.com/facebook/jest/issues/5946
  it('Verificar se fetchProducts é uma função ', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
  });


  it('Verificando se a função foi invocada sem passar parâmetro', async () => {
    const result = await fetchProducts();
    expect(result).toMatch('função invocada sem passar parâmetro');
  });


});