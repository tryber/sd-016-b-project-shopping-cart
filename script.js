const productsPlace = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const emptyButton = document.querySelector('.empty-cart');

const clearCartList = () => {
  cartList.innerHTML = '';
  saveCartItems('');
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function appendToCartList(element) {
  const cartItens = document.querySelector('.cart__items');
  cartItens.append(element);
}

function createItens(sku) {
  fetchItem(sku)
    .then((item) => {
      obj = {
        sku: item.id,
        name: item.title,
        salePrice: item.price,
      };
      appendToCartList(createCartItemElement(obj));
      saveCartItems(cartList.innerHTML);
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    createItens(sku);
  });
  section.appendChild(button);
  return section;
}

function productList() {
  fetchProducts('computador')
    .then((list) => {
      list.forEach((product) => {
        const obj = {
          sku: product.id,
          name: product.title,
          image: product.thumbnail,
        };
        const item = createProductItemElement(obj);
        productsPlace.append(item);
      });
  });
}

function addEventToCart() {
  const cartItens = document.querySelectorAll('.cart__item');
  cartItens.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => {
  productList();
  cartList.innerHTML = getSavedCartItems();
  addEventToCart();
  emptyButton.addEventListener('click', clearCartList);
};
