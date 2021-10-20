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
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(`${image}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const mapProductsAndReturnObject = async (searchParam) => {
  const products = await fetchProducts(searchParam);
  const productsInfo = products.map(({ id, title, thumbnail }) => (
    { id, title, thumbnail }
    ));
  return productsInfo;
};

const appendProductItemElementToSection = (product) => {
  const sectionItem = document.querySelector('.items');
  sectionItem.appendChild(product);
};

const createProductsSection = async (searchParam) => {
  if (searchParam === undefined) {
    throw new Error('You must provide an url');
  }
  const products = await mapProductsAndReturnObject(searchParam);
  products.forEach((product) => {
    const productSection = createProductItemElement(product);
    appendProductItemElementToSection(productSection);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
  createProductsSection('computador');
};
