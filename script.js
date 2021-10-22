fetchProducts();
const cartItems = document.querySelector('.cart__items');

const getNumber = (str) => {
  const m = str.split('R$');
  const price = m.slice(-1);

  return Number(price);
};

const totalPrice = (price, operation) => {
  const total = document.querySelector('.total-price');
  
  if (operation === 'clean') {
    totalValue = 0;
  }
  if (operation === 'remove') {
    totalValue -= price; 
  } else {
    totalValue += price;
  }
  total.innerText = totalValue.toFixed(2);
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
  const obj = event.target;
  totalPrice(getNumber(obj.innerHTML), 'remove');
  obj.remove();
  saveCartItems(cartItems.innerHTML);
  saveTotalValue(); 
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${sku} ${name} | R$${salePrice.toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  totalPrice(salePrice);
  return li;
}

const appendProducts = () => {
  fetchProducts('computador')
  .then((data) => data.results)
    .then((products) => {
    const items = document.querySelector('.items');
    products.forEach((product) => {
      const item = createProductItemElement(product);
      items.appendChild(item);
    });
  });
};

const addToCart = () => {
 const items = document.querySelector('.items');
items.addEventListener('click', (event) => {
if (event.target.className === 'item__add') {
  const getId = event.target.parentElement.querySelector('.item__sku').innerText;
  fetchItem(getId)
    .then((data) => createCartItemElement(data))
    .then(() => saveCartItems(cartItems.innerHTML))
    .then(() => saveTotalValue());
  }
});
};

const loadCart = () => {  
  const items = getSavedCartItems();
  cartItems.innerHTML = items;
  document.querySelectorAll('.cart__item')
    .forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const cleanCart = () => {
cartItems.innerHTML = '';
totalPrice(null, 'clean');
saveCartItems(cartItems.innerHTML);
saveTotalValue();
};

const cleanButton = document.querySelector('.empty-cart');
cleanButton.addEventListener('click', cleanCart);

const saveTotalValue = () => {
  localStorage.setItem('total', totalValue.toFixed(2));
  };

const getTotalValue = () => localStorage.getItem('total');

const loadTotalValue = () => {
  const total = document.querySelector('.total-price');
  total.innerHTML = getTotalValue();
};

window.onload = () => {
  totalValue = getTotalValue();
  appendProducts();
  addToCart();
  loadCart();
  loadTotalValue();
 };
