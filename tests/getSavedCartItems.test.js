const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('4 - Teste a função getSavedCartItems', () => {

  it('Teste a função getSavedCartItems', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});