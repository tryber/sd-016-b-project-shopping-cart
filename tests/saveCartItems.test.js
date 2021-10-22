const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {

  // ************************************** 
  // QUESTÃO 04 : REQUISITOS DOS TESTES  //
  // *******************************************************************************************************s
  // Contribuição: VICTOR SHIN
  // Links Documentação:   //https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-
  // Links Documentação:   https://www.tabnine.com/code/javascript/functions/jest/Matchers/toBeCalled
  // 1- Invocamos a fução saveCartItems, e passamos o argumento pedido pelo teste
  // 2- O que é esperado - que ao passar o argumento '<ol><li>Item</li></ol>' para a função saveCartItem 
  //    o método que adiciona item no localStorage seja chamado. Daí utilizamos o método toBeCalled
  // ******************************************************************************************************* 
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });

  it('localStorage.setItem é chamado com dois parâmetros, cartItems e o segundo o valor passado como arg na funcao', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cartItems',
      '<ol><li>Item</li></ol>'
    );
  });
});