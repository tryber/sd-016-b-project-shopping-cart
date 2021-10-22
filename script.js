const getItems = document.querySelector('.items');
const getOL = document.querySelector('.cart__items');
const getP = document.querySelector('.total-price');
const getLoading = document.querySelector('#load');

let val = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

document.querySelector('.empty-cart').addEventListener('click', () => {
  getOL.innerHTML = '';
  val = 0;
  getP.innerHTML = val;
  saveCartItems(getOL.innerHTML);
});

function cartItemClickListener(event) {
  getOL.removeChild(event.target);
  val -= event.target.innerText.split('$')[1];
  getP.innerHTML = val;
  saveCartItems(getOL.innerHTML);
}

const addEventLi = () => {
  getOL.innerHTML = getSavedCartItems();
  const AllLi = document.querySelectorAll('.cart__item');
  AllLi.forEach((vall) => vall.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const somePrice = (price) => {
  val += price;
  getP.innerHTML = val;
};

const addItemCard = (event) => {
  const idItem = event.target.parentElement.firstElementChild.innerText;
  fetchItem(idItem)
    .then((data) => { 
      getOL.appendChild(createCartItemElement({
        sku: data.id,
        name: data.title,
        salePrice: data.price,
    }));
    somePrice(data.price);
    saveCartItems(getOL.innerHTML);
  });
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addItemCard);
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

const removeLoad = () => {
  getLoading.innerHTML = '';
};

const constructorHTML = (items) => {
  items.forEach((item) => {
    getItems.appendChild(createProductItemElement(item));
  });
  removeLoad();
};

const constructor = (data) => {
  const resultObj = data.map(({ id, title, thumbnail, price }) => ({ sku: id,
    name: title,
    image: thumbnail,
    val: price,
  }));
  constructorHTML(resultObj);
};

fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((data) => constructor(data.results));

window.onload = () => {
  addEventLi();
};
