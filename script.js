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
  section.appendChild(createProductImageElement(`${image}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const mapProductsAndReturnObject = async (searchParam) => {
  const products = await fetchProducts(searchParam);
  const productsInfo = products.map(({ id, title, thumbnail }) => (
    { id, title, thumbnail }
    ));
  return productsInfo;
};

const appendProductItemElementToSection = (product) => {
  const sectionItem = document.querySelector('.items');
  sectionItem.appendChild(product);
};

const createProductsSection = async (searchParam) => {
  const products = await mapProductsAndReturnObject(searchParam);
  products.forEach((product) => {
    const productSection = createProductItemElement(product);
    appendProductItemElementToSection(productSection);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getItemElement = (event) => {
  const itemElement = event.target.parentNode;
  return itemElement;
};

const getCartItems = () => {
  const cartItem = [];
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    cartItem.push(item.innerText);
  });
  return cartItem;
};

function cartItemClickListener(event) {
  const fatherElement = event.target.parentNode;
  fatherElement.removeChild(event.target);
  saveCartItems(getCartItems());
}

const mapFetchItemAndReturnObj = async (itemId) => {
  const itemData = await fetchItem(itemId);
  const itemsInfo = itemData;
  return itemsInfo;
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendProductItemToCart = (product) => {
  const cartSection = document.querySelector('.cart__items');
  cartSection.appendChild(product);
};

const addItemToCart = async (id) => {
  const skuItem = getSkuFromProductItem(id);
  const itemInfos = await mapFetchItemAndReturnObj(skuItem);
  const itemLi = createCartItemElement(itemInfos);
  appendProductItemToCart(itemLi);
  const items = getCartItems();
  saveCartItems(items);
};

const getSavedItems = () => {
  const cartItem = JSON.parse(getSavedCartItems());
  cartItem.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = item;
    li.addEventListener('click', cartItemClickListener);
    appendProductItemToCart(li);
  });
};

const verifyItemAdd = (event) => {
  if (event.target && event.target.classList.contains('item__add')) {
    addItemToCart(getItemElement(event));
  }
};

window.onload = () => {
  const itemsContainer = document.querySelector('.items');
  createProductsSection('computador');
  itemsContainer.addEventListener('click', verifyItemAdd);
  getSavedItems();
};
