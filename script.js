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
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addCartItem = async (sku) => {
  const cartItems = document.querySelector('.cart_items');
  const products = await fetchItems(sku);
  const createCartItem = createCartItemElement(products);
  cartItems.appendChild(createCartItem);
};

function idProduct(event) {
  const innerTextId = event.target.parentNode.firstChild.innerText;
  return innerTextId;
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

// Inicio do meu código
const items = document.querySelector('.items');

const showProducts = async () => {
  const products = await fetchProducts('computador');
  products.results.forEach((product) => {
    const createItem = createProductItemElement(product);
    items.appendChild(createItem);
  });
};

window.onload = () => {
  showProducts();
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classLIst.contains('item_add')) {
      addCartItem(idProduct(event));
    }
  });
 };
