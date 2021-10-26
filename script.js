// Get elements HTML
const itemsCart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

// clean cart
const cleanCart = () => {
  const btn = document.querySelector('.empty-cart');

  btn.addEventListener('click', () => {
    itemsCart.innerHTML = '';
    totalPrice.innerText = '';
    localStorage.clear();
  });
};

// Img product
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// return id prduct
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Save in the Local Storage
const saveLs = () => {
  const product = itemsCart.innerHTML;
  saveCartItems(JSON.stringify(product));
};

// Get the value when refresh
const getValueLs = () => {
  totalPrice.innerHTML = localStorage.getItem('valueProduct');
};

// Subtract the value
const subValue = (event) => {
  const itemText = event.target.innerText;
  const arr = itemText.split(' ');
  const arrLengthPosition = arr[arr.length - 1];
  const valueProduct = arrLengthPosition.replace('$', '');
  let sub = Number(localStorage.getItem('valueProduct'));
  sub -= valueProduct;
  localStorage.setItem('valueProduct', sub);
  totalPrice.innerText = sub;
};

// Remove item off cart
function cartItemClickListener(event) {
  event.target.remove();
  subValue(event);
  saveLs();
}

// Render the cart with Local Storage
const getLocalStorage = () => {
  const produtos = JSON.parse(getSavedCartItems());
  itemsCart.innerHTML = produtos;

  const list = document.querySelectorAll('.cart__item');
  list.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

// Sum the values off products
const sumProducts = (price) => {
  let sum = Number(localStorage.getItem('valueProduct'));
  sum += price;
  localStorage.setItem('valueProduct', sum);
  totalPrice.innerText = sum;
};

// Create the Element
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumProducts(salePrice);
  return li;
}

// Add the product to the cart
const productClick = async (event) => {
  const id = getSkuFromProductItem(event.target.parentNode);
  const product = await fetchItem(id);
  const newCart = createCartItemElement(product);
  itemsCart.appendChild(newCart);
  saveLs();
};

// Create the Product
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Add the products to the section
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', productClick);
  section.appendChild(button);

  return section;
}

// Search the product in api 
const search = async () => {
  loading.innerHTML = 'carregando';
  const productSearch = await fetchProducts('computador');
  loading.remove();
  const sectionPai = document.querySelector('.items');
  productSearch.results.forEach((item) => {
  const criandoProduto = createProductItemElement(item);
  sectionPai.appendChild(criandoProduto);
  });
};

window.onload = () => {
  search();
  getLocalStorage();
  cleanCart();
  getValueLs();
};
