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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const ol = event.target.parentElement;
  ol.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const takeProductsAndShowThem = async () => {
  const computers = await fetchProducts('computador');
  const section = document.querySelector('.items');
  computers.forEach((computer) => {
    section.appendChild(createProductItemElement(computer));
  });
};

const addToCart = (computer) => {
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(computer));
  saveCartItems(ol.innerHTML);
};

const addToCartClickListener = async (event) => {
  const product = event.target.parentElement;
  const id = getSkuFromProductItem(product);
  const computer = await fetchItem(id);
  addToCart(computer);
};

const getButtons = async () => {
  await takeProductsAndShowThem();
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', addToCartClickListener);
  });
};

const emptyCart = () => {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    const ol = document.querySelector('.cart__items');
    // Solução retirada de: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // Enquanto e minha ol ter um primeiro elemento filho, eu removo o ultimo.
    while (ol.firstChild) {
      ol.removeChild(ol.lastChild);
    }
    saveCartItems(ol.innerHTML);
  });
};

const eraseCartItem = () => {
  const cartLi = document.querySelectorAll('.cart__item');
  cartLi.forEach((element) => element.addEventListener('click', (event) => {
    event.target.remove();
  }));
};

window.onload = () => {
  getButtons();
  emptyCart();
  getSavedCartItems();
  eraseCartItem();
};
