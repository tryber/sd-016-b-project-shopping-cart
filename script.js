const olItem = document.querySelector('.cart__items');
const productItems = document.querySelector('.items');
const btnEmptyCart = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function itemsSavedLocalStorage() {
  const loadItems = getSavedCartItems();
  olItem.innerHTML = loadItems;
}

function cartItemClickListener(event) {
  const totalPrice = document.querySelector('.price');
  const value = event.target.innerText.substring(
    event.target.innerText.indexOf('$') + 1, event.target.innerText.length,
  );
  totalPrice.innerText = parseFloat(totalPrice.innerText) - value;
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const totalPrice = document.querySelector('.price');
  totalPrice.innerText = parseFloat(totalPrice.innerText) + salePrice;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // saveCartItems(olItem.innerHTML);
  return li;
}

function getSkuFromProductItem(event) {
  const abc = event.target.parentNode.querySelector('span.item__sku').innerText;
  fetchItem(abc)
  .then((data) => olItem.appendChild(createCartItemElement(data)));
  // saveCartItems(olItem.innerHTML);
}

function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', getSkuFromProductItem);
  }
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
  // saveCartItems(olItem.innerHTML);
  return section;
}

function alheioS() {
  fetchProducts('computador')
    .then((data) => data.results
    .forEach((element) => productItems.appendChild(createProductItemElement(element))));
    // saveCartItems(olItem.innerHTML);
}

btnEmptyCart.addEventListener('click', () => {
  olItem.innerHTML = '';
  localStorage.clear();
  document.querySelector('.price').innerText = 0;
  // saveCartItems(olItem.innerHTML);
  });
  
  // function addLoading() {
  //   document.querySelector('body').appendChild(createCustomElement('div', 'loading', 'loading...'));
  // }
  
  // function removeLoading() {
  //   document.querySelector('.loading').remove();
  // }

window.onload = () => {
  itemsSavedLocalStorage();
  alheioS();
  cartItemClickListener();
};