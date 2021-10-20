// Trybe functions

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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// My functions
const productConstructor = ({ id: sku, title: name, thumbnail: image }) => ({ sku, name, image });

const itemConstructor = ({ id: sku, title: name, price: salePrice }) => ({ sku, name, salePrice });

const renderCardProducts = (id) => fetchItem(id)
    .then((item) => itemConstructor(item))
    .then((item) => createCartItemElement(item));

const addProductOnCart = (event) => {
  const productId = event.target.parentElement.firstElementChild.innerText;

  renderCardProducts(productId)
    .then((product) => {
      document.querySelector('.cart__items').appendChild(product);
    });
};

const renderProducts = () => {
  fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then(({ results: products }) => {
      products
        .map((product) => productConstructor(product))
        .forEach((product) => {
          const newProduct = createProductItemElement(product);
          newProduct.addEventListener('click', addProductOnCart);
          document.querySelector('.items').appendChild(newProduct);
        });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  renderProducts();
};
