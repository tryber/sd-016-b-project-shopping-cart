const cartList = document.querySelector('.cart__items');
const clearButton = document.querySelector('.empty-cart');
const loadMessage = document.querySelector('.loading');

function cartItemClickListener(event) {
  cartList.removeChild(event.target);
}

const loading = () => {
  loadMessage.innerHTML = '';
};

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

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const moveItems = async (e) => {
  const getId = getSkuFromProductItem(e.target.parentNode);
  const item = await fetchItem(getId);
  const cart = createCartItemElement(item);
  cartList.appendChild(cart);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', moveItems);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  loading();
  return section;
}

const putItens = async () => {
  await fetchProducts('computador')
    .then((products) => {
      const itemsCointainer = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        itemsCointainer.appendChild(item);
      });
  });
};

const clearList = () => {
  clearButton.addEventListener('click', () => {
    cartList.innerHTML = '';
  });
};

clearList();

window.onload = () => { 
  putItens();
};
