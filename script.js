/* const { fetchProducts } = require('./helpers/fetchProducts'); */

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
  /* { sku, name, image } fetchProducts('computador'); */
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')
  );

  return section;
}

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

const searchID = async () => {
  const idProducts = await fetchItem('MLB1341706310');
  const cart = document.querySelector('.cart__items');
  const idObject = {
    sku: idProducts.id,
    name: idProducts.title,
    salePrice: idProducts.price,
  };
  const createFunc = createCartItemElement(idObject);
  cart.appendChild(createFunc);
  return idProducts;
};

/* const addCartItem = () => {

}; */

const search = async () => {
  const products = await fetchProducts('computador');
  const sectionP = document.querySelector('.items');
  products.results.forEach((p) => {
    const dataProducts = {
      sku: p.id,
      name: p.title,
      image: p.thumbnail,
    };
    const produtoFnal = createProductItemElement(dataProducts);
    sectionP.appendChild(produtoFnal);
  });
};

const emptyBtn = document.querySelector('.empty-cart');
emptyBtn.addEventListener('click', () => {
  const liItem = document.querySelector('.cart__item');
  liItem.remove();
});

/* const localStorageSave = () => {
  const item = document.querySelector('.cart__item');
  saveCartItems(JSON.stringify(item));
}; */

window.onload = () => {
  search();
  searchID();
};
