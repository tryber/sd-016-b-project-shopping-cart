const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui

  test('1.fetchProducts é uma função?', () => expect(fetchProducts).toBeInstanceOf(Function));
  
  test('4.fecthProducts com parametro \'computador\'', async ()=>{
    let r = [];
    await fetchProducts('computador').then((c) => expect(c).toEqual(computadorSearch));
  });
  // fail('Teste vazio');
});
