fetchProducts();
const cartItems = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');

const getNumber = (str) => {
  const m = str.split('R$');
  const price = m.slice(-1);

  return Number(price);
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

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

// https://stackoverflow.com/questions/63211646/can-you-use-reduce-on-a-nodelist 
// usando reduce com queryselectorall ref
const updateTotalPrice = () => {
  const sumCart = [...document.querySelectorAll('.cart__item')]
                      .reduce((a, c) => a + (getNumber(c.innerHTML)), 0);
  const totalValue = sumCart;              
  total.innerText = totalValue.toFixed(2);
  return totalValue.toFixed(2);
};

function cartItemClickListener(event) {
  const obj = event.target;
  
  obj.remove();
  updateTotalPrice();
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${sku} ${name} | R$${salePrice.toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  updateTotalPrice(); 
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
    .then(() => saveCartItems(cartItems.innerHTML));
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
saveCartItems(cartItems.innerHTML);
updateTotalPrice();
};

const cleanButton = document.querySelector('.empty-cart');
cleanButton.addEventListener('click', cleanCart);

const loadTotalValue = () => {
  total.innerHTML = updateTotalPrice();
};

window.onload = () => {
  updateTotalPrice();
  appendProducts();
  addToCart();
  loadCart();
  loadTotalValue();
 };
