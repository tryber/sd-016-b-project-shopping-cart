function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const cartItemClickListener = (event) => event.target.remove();

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductToCart = (sku) => {
  const cart = document.querySelector('.cart__items');
  fetchItem(sku)
    .then(createCartItemElement)
    .then((item) => cart.appendChild(item));
};

function createCustomElement(element, className, innerText, callback) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  // Ideia de adicionar o eventListener aqui dada pelo Gabriel Pinheiro @GabrielFMPinheiro
  if (callback) e.addEventListener(callback.event, callback.func);
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button',
    'item__add',
    'Adicionar ao carrinho!',
    { event: 'click', func: () => addProductToCart(sku) }));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const loadProducts = () => {
  fetchProducts('computador')
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
};

window.onload = () => {
  loadProducts();
};
