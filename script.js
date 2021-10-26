const ol = document.querySelector('.cart__items');
// const btnClear = document.querySelector('.empty-cart');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
ol.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const cartItems = (event) => {
  const getId = getSkuFromProductItem(event.target.parentElement);
  fetchItem(getId)
  .then((data) => 
  ol.appendChild(createCartItemElement(data)));
  };

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
   e.addEventListener('click', cartItems);
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
  return section;
}

const render = async (product) => {
const theItems = await fetchProducts(product)
.then((data) => data.results);
const sectionItems = document.querySelector('.items');
theItems.forEach((result) => {
const sections = createProductItemElement(result);
 sectionItems.appendChild(sections);
 });
};

window.onload = () => {
  render('computador');
};  
