const unstructure = async (url) => {
  const result = await fetchProducts(url);
  const data = await result.results;
  const response = await data.map((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    return { sku, name, image };
  });
  return response;
};

const itens = unstructure('computador');

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
  // coloque seu código aqui m
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createNavigation = () => {
  const productList = document.querySelector('.items');
  itens.then((item) => item.forEach((element) => {
    const { sku, name, image } = element;
    productList.appendChild(createProductItemElement({ sku, name, image }));
  }));
};

createNavigation();

window.onload = () => { };
