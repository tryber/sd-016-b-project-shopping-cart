const staticElements = {
  cartItems: document.querySelector('.cart__items'),
  allItems: document.querySelector('.items'),
  btnEmptyCart: document.querySelector('.empty-cart'),
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
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const productOnCart = event.target;
  productOnCart.outerHTML = '';
}

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

const renderCardProducts = async (id) => {  
  showLoadMesage();

  const cartItem = await fetchItem(id)
    .then((item) => itemConstructor(item))
    .then((item) => createCartItemElement(item));

  hideLoadMesage();

  return cartItem;
};

const addProductOnCart = (event) => {
  const productId = event.target.parentElement.firstElementChild.innerText;

  renderCardProducts(productId)
    .then((product) => {
      staticElements.cartItems.appendChild(product);
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

const renderProducts = async () => {
  showLoadMesage();

  await fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then(createProducts)
    .catch((error) => console.log(error));

  hideLoadMesage();
};

const emptyCart = () => {
    staticElements.btnEmptyCart.addEventListener('click', () => {
      staticElements.cartItems.innerHTML = '';
    });
};

window.onload = () => {
  renderProducts();
  emptyCart();
};
