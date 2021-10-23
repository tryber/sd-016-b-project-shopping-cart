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

const imgCartIten = (imgSrc) => {
  img = document.createElement('img');
  img.className = 'item__image_cart';
  img.src = imgSrc;
  return img;
};

function cartItemClickListener(event) {
  const base = getSavedCartItems();
  const newBase = base.split(',');
  const rmItem = event.target.parentNode.getAttribute('sku');
  newBase.splice(rmItem, 1);
  saveCartItems(newBase);
  return updateCart();
  // event.target.parentNode.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: imG }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('sku', `${sku}`);
  li.innerHTML = `<p class="item_desc">
  SKU: ${sku} | NAME: ${name} | PRICE: R$ ${salePrice}</p><p class="item_close">X</p>`;
  li.appendChild(imgCartIten(imG));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function updateCart() {
  const base = getSavedCartItems();
  const newBase = base.split(',');
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = '';
  newBase.forEach(async (cartIten) => { 
    const newItem = await fetchItem(cartIten);
    cart.appendChild(createCartItemElement(newItem));
  });
}

async function newIten(sku) {
  saveCartItems(sku.id);
  updateCart();
}

async function getSkuFromProductItem(event) {
  const base = getSavedCartItems();
  const rest = await fetchItem(event.target.parentNode.querySelector('span.item__sku').innerText);
  if (base.length === 0) {
    saveCartItems(rest.id);
    return updateCart();
  }
  return newIten(rest.id);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: pice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.addEventListener('click', getSkuFromProductItem);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$: ${pice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

window.onload = () => {
  fetchProducts('computador').then((inventory) => {
    inventory.results.forEach((product) => document.querySelector('.items')
      .appendChild(createProductItemElement(product)));
  });
  updateCart();
};

if (typeof module !== 'undefined') {
  module.exports = createCartItemElement;
}