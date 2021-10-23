const itemsSection = document.querySelector('section.items');
const cartItemsSection = document.querySelector('.cart__items');

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

function getTotalPrice() {
  let totalPrice = 0;
  cartItemsSection.childNodes.forEach((cartItem) => {
    const cartItemInfo = cartItem.innerText;
    const priceLabel = 'PRICE: $';
    const price = cartItemInfo.slice(cartItemInfo.indexOf(priceLabel) + priceLabel.length);
    totalPrice += parseFloat(price);
  });
  return totalPrice;
}

function updateTotalPrice() {
  const totalPriceElement = document.querySelector('.total-price');
  const totalPrice = getTotalPrice();
  totalPriceElement.innerText = `${totalPrice}`;
}

function cartItemClickListener({ target: cartItem }) {
  cartItem.remove();
  saveCartItems(cartItemsSection.innerHTML);
  updateTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function displayLoadingMessage(parentElement) {
  const loadingMessage = document.createElement('p');
  loadingMessage.innerText = 'carregando...';
  loadingMessage.className = 'loading';
  parentElement.appendChild(loadingMessage);
}

function removeLoadingMessage(parentElement) {
  const loadingMessage = parentElement.querySelector('p.loading');
  loadingMessage.remove();
}

/**
 * Consultei o código do instrutor Bernardo Salgueiro para resolver essa parte.
 * Link: https://files.slack.com/files-tmb/TMDDFEPFU-F02KATKTLBS-a04e16cc19/primeiro_requisito_-_shopping_cart.mp4
 */
async function displayProducts(productName) {
  displayLoadingMessage(itemsSection);
  const { results: products } = await fetchProducts(productName);
  const itemsSectionFragment = new DocumentFragment();
  removeLoadingMessage(itemsSection);

  products.forEach(({ id, title, thumbnail }) => {
    const product = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const productItemElement = createProductItemElement(product);
    itemsSectionFragment.appendChild(productItemElement);
  });
  itemsSection.appendChild(itemsSectionFragment);
}

async function displayCartItem(productItemElement) {
  displayLoadingMessage(cartItemsSection);
  const item = await fetchItem(getSkuFromProductItem(productItemElement));
  removeLoadingMessage(cartItemsSection);

  const cartItem = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const cartItemElement = createCartItemElement(cartItem);
  cartItemsSection.appendChild(cartItemElement);
  saveCartItems(cartItemsSection.innerHTML);
  updateTotalPrice();
}

function initCartItems() {
  cartItemsSection.innerHTML = getSavedCartItems();
  cartItemsSection.childNodes.forEach((child) => (
    child.addEventListener('click', cartItemClickListener)
  ));
  updateTotalPrice();
}

function emptyCart() {
  cartItemsSection.innerHTML = '';
  saveCartItems(cartItemsSection.innerHTML);
  updateTotalPrice();
}

itemsSection.addEventListener('click', (event) => {
  if (event.target.matches('.item__add')) {
    displayCartItem(event.target.parentElement);
  }
}, false);

const emptyCartButton = document.querySelector('.empty-cart');
emptyCartButton.addEventListener('click', emptyCart);

window.onload = () => {
  displayProducts('computador');
  initCartItems();
};
