// Get elements HTML
const cartItems = document.querySelector('.cart_items');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

// Clean Cart
const cleanCart = () => {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    totalPrice.innerText = '';
    localStorage.clear();
  });
};
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
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItems = async (product) => {
  await fetchProducts(product).then((results) => {
    const items = document.querySelector('.items');
    results.forEach((result) => {
      const item = createProductItemElement(result);
      items.appendChild(item);
    });
  });
};
window.onload = () => {
  addItems('computador');
};
