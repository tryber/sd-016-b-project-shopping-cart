const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - A função fetchProducts', () => {
  // implemente seus testes aqui
  it('deve ser uma função.', () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function);
  })

  it("com o argumento 'computador' chama a função 'fetch'", async () => {
    await fetchProducts('computador');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalled();
  })

  it("com o argumento 'computador', a função 'fetch' utiliza o endpoint correto", async () => {
    await fetchProducts('computador');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })

  it("com o argumento 'computador', retorna a função com uma estrutura de dados igual ao objeto 'computadorSearch' ", async () => {
    const response = await fetchProducts('computador');
    expect.assertions(1);
    expect(response).toEqual(computadorSearch);
  })

  

  //fail('Teste vazio');
});
