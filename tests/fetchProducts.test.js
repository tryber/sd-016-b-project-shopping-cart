const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui

  test('1.fetchProducts é uma função?', () => expect(fetchProducts).toBeInstanceOf(Function));
  
  test('Teste fecthProducts vazio', async ()=>{
    await fetchProducts().then((c) => console.table(c));
  });
  // fail('Teste vazio');
});
