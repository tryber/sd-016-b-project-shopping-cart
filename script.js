const staticElements = {
  cartItems: document.querySelector('.cart__items'),
  allItems: document.querySelector('.items'),
  btnEmptyCart: document.querySelector('.empty-cart'),
  subTotal: document.querySelector('.total-price'),
};

const user = {
  subTotal: 0,
};

// Trybe functions

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveSubTotal = () => {
  const subTotal = staticElements.subTotal.innerText;
  
  localStorage.setItem('subTotal', subTotal);
};

const getSavedSubTotal = () => {
  if (localStorage.getItem('subTotal')) {
    const subTotal = localStorage.getItem('subTotal');
    staticElements.subTotal.innerText = subTotal;
    user.subTotal = Number.parseFloat(subTotal.split('$')[1]);
  } else {
    user.subTotal = 0;
  }
};

const saveCart = () => { // My func
  const allProducts = staticElements.cartItems.innerHTML;
  saveCartItems(JSON.stringify(allProducts));
  saveSubTotal();
};

const updateTotalPrice = (value, { target }) => { // My func
  if (target.className === 'empty-cart') user.subTotal = 0;
  if (target.className === 'cart__item') user.subTotal -= value;
  else user.subTotal += value;

  staticElements.subTotal.innerText = user.subTotal;
};

function cartItemClickListener(event) { // My func
  const productOnCart = event.target; 
  const priceRegex = new RegExp(/\w*: \$(?<price>\d*.\d{0,2})$/);
  const price = productOnCart.innerText.match(priceRegex)[1];

  updateTotalPrice(Number.parseFloat(price), event);
  productOnCart.outerHTML = '';
  saveCart();
}

const renderSavedCart = () => { // My func
  const cartItems = JSON.parse(getSavedCartItems());
  staticElements.cartItems.innerHTML = cartItems;
  getSavedSubTotal();
  document.querySelectorAll('.cart__item')
    .forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// My functions

const showLoadMesage = () => {
  const loadMsg = document.createElement('div');
  loadMsg.classList.add('loading');
  loadMsg.innerText = 'carregando...';
  document.querySelector('body').appendChild(loadMsg);
};

const hideLoadMesage = () => {
  document.querySelector('.loading').remove();
};

const productConstructor = ({ id: sku, title: name, thumbnail: image }) => ({ sku, name, image });

const itemConstructor = ({ id: sku, title: name, price: salePrice }) => ({ sku, name, salePrice });

const renderCardProducts = (id, event) => {  
  showLoadMesage();

  return fetchItem(id)
    .then((item) => itemConstructor(item))
    .then((item) => {
      updateTotalPrice(item.salePrice, event);
      hideLoadMesage();
      return createCartItemElement(item);
    });
};

const addProductOnCart = (event) => {
  const productId = getSkuFromProductItem(event.target.parentNode);

  renderCardProducts(productId, event)
    .then((product) => {
      staticElements.cartItems.appendChild(product);
      saveCart();
    });
};

const createProducts = ({ results: products }) => {
  products
    .map((product) => productConstructor(product))
    .forEach((product) => {
      const newProduct = createProductItemElement(product);
      newProduct.addEventListener('click', addProductOnCart);
      staticElements.allItems.appendChild(newProduct);
    });
};

const renderProducts = () => {
  showLoadMesage();

  fetchProducts('computador')
    .then(createProducts)
    .then((_) => hideLoadMesage())
    .catch((error) => console.log(error));
};

const emptyCart = () => {
    staticElements.btnEmptyCart.addEventListener('click', (event) => {
      staticElements.cartItems.innerHTML = '';
      updateTotalPrice(0, event);
      saveCart();
    });
};

window.onload = () => {
  renderSavedCart();
  renderProducts();
  emptyCart();
  saveCart();
};
