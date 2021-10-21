const localStorageNull = () => {
  if (localStorage.getItem('cartItems') === null) localStorage.setItem('cartItems', '[]');
};

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
  const parentSection = document.querySelector('.items');
  
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  parentSection.appendChild(section);

  // return section;
}

const createProductRotation = async () => {
  const itensArray = await fetchProducts('computador');
  itensArray.results.forEach((item) => createProductItemElement(item));
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const currentOl = () => document.querySelector('.cart__items');

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(currentOl());
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  const cart = document.querySelector('.cart__items');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cart.appendChild(li);
  saveCartItems(currentOl());
}

const addToCart = () => {
  const buttons = document.querySelector('.items');
  buttons.addEventListener('click', (event) => {
    if (event.target.className !== 'item__add') return;
    const idByParent = event.target.parentNode.querySelector('.item__sku').innerText;
    fetchItem(idByParent).then((data) => createCartItemElement(data));
  });
};

const cartOnRefresh = () => {
  const arrayFromLocal = JSON.parse(getSavedCartItems());
  // console.log(arrayFromLocal);
  arrayFromLocal.forEach((id) => fetchItem(id)
    .then((element) => createCartItemElement(element)));
};

localStorageNull();
createProductRotation();
addToCart();
cartOnRefresh();

window.onload = () => { };
