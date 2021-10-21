const elementoItems = document.querySelector('.items');
const elementoCart = document.querySelector('.cart__items');



function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  elementoCart.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemCart = (event) => {
  const item = event.target.parentElement.firstChild.innerText;
  fetchItem(item)
    .then((valor) => elementoCart.appendChild(createCartItemElement(valor)));
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addItemCart);
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

const getItems = (objeto) => {
  objeto.forEach((element) => {
    elementoItems.appendChild(createProductItemElement({ 
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    }));
  });
};

fetchProducts('computador')
  .then((response) => getItems(response.results));

window.onload = async () => {

};
