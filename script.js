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

// const cartItemClickListener = (event) => {
//   console.log(event.target.parentNode);
//   event.stopPropagation();
//   event.target.parentNode.remove();
//   // saveCartItems();
// };

const cartItens = document.querySelector('.cart__items');
cartItens.addEventListener('click', (event) => {
  const item = event.target;
  if (item.tagName === 'LI') { item.remove(); return saveCartItems(); }
  if (item.tagName === 'P') { item.parentNode.remove(); return saveCartItems(); }
  if (item.tagName === 'IMG') { item.parentNode.remove(); return saveCartItems(); }
});

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: imG }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('sku', `${sku}`);
  li.innerHTML = `<p class="item_desc">SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}</p>`;
  li.appendChild(imgCartIten(imG));
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getSkuFromProductItem(event) {
  const rest = await fetchItem(event.target.parentNode.querySelector('span.item__sku').innerText);
  document.querySelector('ol.cart__items').appendChild(createCartItemElement(rest));
  saveCartItems();
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

const btnClrCart = document.querySelector('.empty-cart');
btnClrCart.addEventListener('click', () => {
  document.querySelector('ol.cart__items').innerHTML = '';
  return saveCartItems();
});

// const start = () => {
//   getSavedCartItems();
//   const targetObserver = document.querySelectorAll('.cart__item');
//   targetObserver.forEach((item) => item.addEventListener('click', cartItemClickListener));
// };

window.onload = () => {
  fetchProducts('computador').then((inventory) => {
    inventory.results.forEach((product) => document.querySelector('.items')
      .appendChild(createProductItemElement(product)));
  }); getSavedCartItems();
};

if (typeof module !== 'undefined') {
  module.exports = createCartItemElement;
}