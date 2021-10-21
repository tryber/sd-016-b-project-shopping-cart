const getItens = document.querySelector('.items');
const getOl = document.querySelector('.cart__items');
const getallOl = document.querySelectorAll('.cart__items');
const deletButton = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  getOl.removeChild(event.target);

}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const funnn = async (e) => {
  const lalala = e.target.parentElement.firstChild.innerText;
  await fetchItem(lalala)
    .then((reponse) => getOl.appendChild(createCartItemElement(reponse)));
  saveCartItems(getOl.innerHTML);
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', funnn);
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

const constructorHTML = (items) => {
  items.forEach((item) => {
    getItens.appendChild(createProductItemElement(item));
  });
};

const constructor = (data) => {
  const resultObj = data.map(({ id, title, thumbnail, price }) => ({
    sku: id,
    name: title,
    image: thumbnail,
    salePrice: price,
  }));
  constructorHTML(resultObj);
};

fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((data) => constructor(data.results));

const morefun = () => {
  getOl.innerHTML = getSavedCartItems();
  getallOl.forEach((x) => x.addEventListener('click', cartItemClickListener));
};

deletButton.addEventListener('click', () => {
  getOl.innerHTML = '';
});

window.onload = () => {
  morefun();
};
