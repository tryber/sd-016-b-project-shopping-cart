let cart;
let totalPrice;
let items;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const updateTotalPrice = () => {
  let result = 0;

  for (let i = 0; i < cart.children.length; i += 1) {
    const child = cart.children[i];
    const price = Number(child.getAttribute('price'));
    if (price) {
      result += price;
    }
  }

  totalPrice.innerHTML = result;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('price', salePrice);
  return li;
}

const addCartItem = async (sku) => {
  const { id, title, price } = await fetchItem(sku);
  const elem = createCartItemElement({ sku: id, name: title, salePrice: price });
  cart.appendChild(elem);

  saveCartItems(cart.innerHTML);
  updateTotalPrice();

  return true;
};

function addItemToCartClick(event) {
  return addCartItem(getSkuFromProductItem(event.target.parentElement));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addItemToCartClick);
  section.appendChild(button);

  return section;
}

function cartItemClickListener(event) {
  const parent = event.target.parentElement;
  parent.removeChild(event.target);
  saveCartItems(parent.innerHTML);
  updateTotalPrice();
}

const loadCartItems = () => {
  cart.addEventListener('click', cartItemClickListener);
  cart.innerHTML = getSavedCartItems() || '';
  updateTotalPrice();
  return true;
};

const loadShopItems = async () => {
  const { results } = await fetchProducts('computador');

  results.forEach((result) => {
    const params = { sku: result.id, name: result.title, image: result.thumbnail };
    items.appendChild(createProductItemElement(params));
  });
};

window.onload = () => {
  cart = document.querySelector('.cart__items');
  totalPrice = document.querySelector('.total_price');
  items = document.querySelector('.items');

  loadShopItems();
  loadCartItems();
};
