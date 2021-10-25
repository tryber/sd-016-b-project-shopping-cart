const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
it('se fetch item é uma função', () =>{
  expect(typeof fetchItem).toBe('function');
})
it('se a fetch é chamado ', () => {
  fetchItem("MLB1615760527")
  expect(fetch).toHaveBeenCalled()
})
it('testar se o endpoints é chamado corretamente', () => {
  const endPoint = "https://api.mercadolibre.com/items/MLB1615760527";
  fetchItem("MLB1615760527")
  expect(fetch).toHaveBeenCalledWith(endPoint);
})
it('testar se o retorno da função fetchItems é uma estrutura de dados igual ao objeto fetchitems', async () =>{
  const result = await fetchItem('MLB1615760527');
  expect(result).toEqual(item)
})
it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url',async () =>{
  const result = await fetchItem();
  const error = new Error('You must provide an url');
  expect(result).toEqual(error);
})
});
