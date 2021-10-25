const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});
// ************************************** 
// QUESTÃO 04 : REQUISITOS DOS TESTES  //
// *******************************************************************************************************s
// Links Documentação:   //https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-
// Links Documentação:   https://www.tabnine.com/code/javascript/functions/jest/Matchers/toBeCalled
// ******************************************************************************************************* 
describe('4 - Teste a função getSavedCartItems', () => {
  
  it('Teste se ao invocar o método getSavedCartItems  o metodo local storage e chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('Teste se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parametro', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });

});