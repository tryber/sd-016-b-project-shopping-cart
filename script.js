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

function cartItemClickListener(event) {

}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function carItems(event) {
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const allList = await fetchItem(getSku);
  const ol = document.querySelector('.cart__items');
  const car = createCartItemElement(allList);
  ol.appendChild(car);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', carItems);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);

  return section;
}

const showItems = async () => {
  const catchFetch = await fetchProducts('computador');
  catchFetch.results.forEach((item) => {
    const catchSection = document.querySelector('.items');
    const createElementFunc = createProductItemElement(item);
    catchSection.appendChild(createElementFunc);
  });
};

window.onload = () => {
  showItems();
};