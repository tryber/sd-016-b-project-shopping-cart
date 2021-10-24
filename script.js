// let bdItemsCarrinho = [];
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText, butaoAction) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (butaoAction) {
    e.addEventListener(butaoAction.event, butaoAction.callsTheAddProductToCartFunction);
  }
  return e;
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

const addProductToCart = (idItem) => {
  const shoppingCart = document.querySelector('.cart__items');
  fetchItem(idItem)
    .then(createCartItemElement)
    .then((item) => shoppingCart.appendChild(item));
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button',
    'item__add',
    'Adicionar ao carrinho!',
    { event: 'click', callsTheAddProductToCartFunction: () => addProductToCart(sku) }));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const loadProducts = async (category) => {
  await fetchProducts(category)
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
};

window.onload = () => { 
  loadProducts('computador'); 
};
