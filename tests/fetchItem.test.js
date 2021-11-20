const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe("2 - Teste a função fecthItem", () => {
  // implemente seus testes aqui
  test("1.1 Teste se fetchItem é uma função", () => {
    expect(typeof fetchItem).toBe("function");
  });

  test("1.2 Teste se a função foi chamada", () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  test("1.3 Testa a função com o endPoint", () => {
    const endPoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetchItem).toHaveBeenCalledWith(endPoint);
  });

  test("1.4 Teste o retorno de fetchItem para ser igual a computadorSearch", async () => {
    const func = await fetchItem("MLB1615760527");
    expect(func).toEqual(item);
  });

  test("1.5 Teste chamar a função sem parametro e retorne erro", async () => {
    const error = new Error("You must provide an url");
    const func = await fetchItem();
    expect(func).toEqual(error);
  });
});
