const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });
  it('Teste se fetch foi chamada executando a função fetchProducts com o argumento "computador"', async () => {
    const fetchCalled = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" ao chamar a função fetchProducts com o argumento "computador"', async () => {
    const fetchCalled = await fetchProducts('computador');
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    expect(fetch).toHaveBeenCalledWith(url);
  });
});
