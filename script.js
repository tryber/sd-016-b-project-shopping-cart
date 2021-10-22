function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
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

const throwInCart = async (event) => {
  const getSku = getSkuFromProductItem(event.target.parentNode)
  const item = await fetchItem(getSku);
  const cartList = document.querySelector('.cart__items');
  const createElement = createCartItemElement(item);
  cartList.appendChild(createElement);
}

const createProductItemElement = ({ id: sku, title:name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')
  button.addEventListener('click', throwInCart)
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  return section;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

const createItems = async () => {
  const allItems = await fetchProducts('computador');
  const itemSection = document.querySelector('.items');
  return allItems.forEach((item) => {
    const createElement = createProductItemElement(item)
    itemSection.append(createElement)
  })
}

window.onload = () => {
  createItems();
};