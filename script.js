function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item
    .innerText
    .match(/^(?:\w*: )(?<sku>\w*)/)
    .groups
    .sku;
}

function getPriceFromProductItem(item) {
  return item
    .innerText
    .match(/\w*: \$(?<price>\d*.\d{0,2})$/)
    .groups
    .price;
}

const updateCartSubTotal = (product, operation) => {
  const totalPrice = document.getElementById('subtotal');
  const totalPriceValue = parseFloat(totalPrice.innerText);
  const productPrice = parseFloat(product.price);
  if (operation === 'add') {
    totalPrice.innerText = (totalPriceValue + productPrice).toFixed(2);
  }
  if (operation === 'subtract') {
    totalPrice.innerText = (totalPriceValue - productPrice).toFixed(2);
  }
  return product;
};

const cartItemClickListener = ({ target }) => {
  const sku = getSkuFromProductItem(target);
  removeCartItems(sku);
  const price = getPriceFromProductItem(target);
  updateCartSubTotal({ price }, 'subtract');
  target.remove();
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductToCart = (sku) => {
  const cart = document.querySelector('.cart__items');
  fetchItem(sku)
    .then((product) => updateCartSubTotal(product, 'add'))
    .then(createCartItemElement)
    .then((item) => cart.appendChild(item))
    .then((_) => saveCartItems(sku));
};

function createCustomElement(element, className, innerText, callback) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  // Ideia de adicionar o eventListener aqui dada pelo Gabriel Pinheiro @GabrielFMPinheiro
  if (callback) e.addEventListener(callback.event, callback.func);
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button',
    'item__add',
    'Adicionar ao carrinho!',
    { event: 'click', func: () => addProductToCart(sku) }));

  return section;
}

const loadProducts = () => {
  fetchProducts('computador')
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
};

const loadCartItems = () => {
  const products = getSavedCartItems();
  if (!products) return;
  products.forEach(addProductToCart);
};

const resetTotal = () => {
  const price = parseFloat(document.getElementById('subtotal').innerText);
  updateCartSubTotal({ price }, 'subtract');
};

const clearLocalStorage = () => localStorage.removeItem('cartItems');

const clearCart = () => {
  resetTotal();
  clearLocalStorage();
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = '';
};

const addEmptyCartEvents = () => {
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', clearCart);
};

const addEvents = () => {
  addEmptyCartEvents();
};

window.onload = () => {
  loadProducts();
  loadCartItems();
  addEvents();
};
