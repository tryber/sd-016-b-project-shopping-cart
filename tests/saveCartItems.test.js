describe('4 - Teste a função saveCartItems', () => {
it('1.1 - Verificar se o saveCartItems.js é realmente uma Function:', () => {
  expect(typeof saveCartItems).toEqual('function');
});
it('1.2 - Verificar se o saveCartItems.js é realmente uma Function with InstanceOf:',() => {
  expect(saveCartItems).toBeInstanceOf(Function);
}); it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
  saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem).toHaveBeenCalled();
});
it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para', () => {
  saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
});
});
