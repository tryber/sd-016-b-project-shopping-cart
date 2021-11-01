
describe('4 - Teste a função getSavedCartItems', () => {

  it('When saveCartItems is executed, the localStorage is called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Testing arguments', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cartItems',
      '<ol><li>Item</li></ol>'
    );
  });
});