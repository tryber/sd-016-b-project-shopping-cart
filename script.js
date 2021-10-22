const cart = document.querySelector('.cart__items');

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
  const element = event.target;
  element.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const renderProducts = async () => {
  const items = document.querySelector('.items');
  const { results } = await fetchProducts('computador');

  results.forEach((product) => {
    const { id, title, thumbnail } = product;
    const productData = { sku: id, name: title, image: thumbnail };
    items.appendChild(createProductItemElement(productData));
  });
};

const saveCart = () => {
  saveCartItems(cart.innerHTML);
};

const addItemToCart = () => {
  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { parentElement } = e.target;
      const productSku = getSkuFromProductItem(parentElement);
      const { 
        id: sku, 
        title: name, 
        price: salePrice,
      } = await fetchItem(productSku);

      cart.appendChild(createCartItemElement({ sku, name, salePrice }));
      saveCart();
    });
  });
};

window.onload = async () => {
  await renderProducts();
  
  addItemToCart();
};
