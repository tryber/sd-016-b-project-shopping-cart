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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function onClickEventItem(event) {
  const targetItem = event.target.parentElement;
  const itemId = getSkuFromProductItem(targetItem);
  const itemData = await fetchItem(itemId);
  const cartItem = document.querySelector('.cart__items');
  cartItem.appendChild(createCartItemElement(itemData));
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const eventButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  eventButton.addEventListener('click', onClickEventItem);
  section.appendChild(eventButton);

  return section;
}

function mapAllProducts(products) {
  const root = document.querySelector('.items');
  return products.map((product) => (
    root.appendChild(createProductItemElement(product)) 
  ));
}

window.onload = async () => {
  const searchResult = await fetchProducts('computador');
  mapAllProducts(searchResult);
 };
