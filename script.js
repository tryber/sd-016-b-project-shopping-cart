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
  const cartItem = event.target;
  const cartItemsSection = cartItem.parentElement;

  cartItem.remove();
  saveCartItems(cartItemsSection.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | PRODUTO: ${name} | PREÇO: R$${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

/**
 * Consultei o código do instrutor Bernardo Salgueiro para resolver essa parte.
 * Link: https://files.slack.com/files-tmb/TMDDFEPFU-F02KATKTLBS-a04e16cc19/primeiro_requisito_-_shopping_cart.mp4
 */
async function displayProducts(productName) {
  const { results: products } = await fetchProducts(productName);
  const itemsSection = document.querySelector('section.items');

  const itemsSectionFragment = new DocumentFragment();

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
  const item = await fetchItem(getSkuFromProductItem(productItemElement));
  const cartItemsSection = document.querySelector('.cart__items');

  const cartItem = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const cartItemElement = createCartItemElement(cartItem);
  cartItemsSection.appendChild(cartItemElement);
  saveCartItems(cartItemsSection.innerHTML);
}

function initCartItems() {
  const cartItemsSection = document.querySelector('.cart__items');

  cartItemsSection.innerHTML = getSavedCartItems();
  cartItemsSection.childNodes.forEach((child) => (
    child.addEventListener('click', cartItemClickListener)
  ));
}

function emptyCart() {
  const cartItemsSection = document.getElementsByClassName('cart__items');
  cartItemsSection.innerHTML = '';
  saveCartItems(cartItemsSection.innerHTML);
}

const itemsSection = document.querySelector('section.items');
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
