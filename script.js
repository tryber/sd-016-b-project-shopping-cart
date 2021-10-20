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
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadProductsPage = () => {
   fetchProducts('computador')
   .then((data) => data.results)
   .then((products) => {
    const sectionItems = document.querySelector('.items');
    products.forEach((product) => {
    const createSectionItems = createProductItemElement(product);
    sectionItems.appendChild(createSectionItems); 
    }); 
  });
};

const loadProductCart = (id) => {
  fetchItem(id).then((item) => {
    const cartItems = document.querySelector('.cart__items');
    const cartLi = createCartItemElement(item);
    cartItems.appendChild(cartLi);
  });
};

window.onload = () => { 
  loadProductsPage();
  loadProductCart('MLB1341706310');
};
