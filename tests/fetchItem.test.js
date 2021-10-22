const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - A função fecthItem', () => {
  // implemente seus testes aqui
  it('deve ser uma função.', () => {
    expect.assertions(1);
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it("com o argumento 'MLB1615760527' chama a função 'fetch'", async () => {
    await fetchItem('MLB1615760527');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalled();
  })

  it("com o argumento 'MLB1615760527', a função 'fetch' utiliza o endpoint correto", async () => {
    await fetchItem('MLB1615760527');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  })

  it("com o argumento 'MLB1615760527', retorna a função com uma estrutura de dados igual ao objeto 'item' ", async () => {
    const response = await fetchItem('MLB1615760527');
    expect.assertions(1);
    expect(response).toEqual(item);
  })

  it("sem o argumento, retorna a mensagem de erro 'You must provide an url' ", async () => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toEqual(new Error ('You must provide an url'));
  })

  //fail('Teste vazio');
});
