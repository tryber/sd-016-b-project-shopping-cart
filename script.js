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
  event.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(li));
  console.log(li);
  saveCartItems(li);
  return li;
}

const cartItems = async (item) => {
  const itemSearched = await fetchItem(item);
  const cartList = document.querySelector('.cart__items');
  
  cartList.appendChild(createCartItemElement(itemSearched));
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => cartItems(sku));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(btn);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const fetchListItens = async (item) => {
  const fetchSpecifics = await fetchProducts(item);
  const listItems = document.querySelector('.items');
   return fetchSpecifics.forEach((element) => {
    listItems.appendChild(createProductItemElement(element));
  });
};

window.onload = () => { 
  fetchListItens('computador');
  getSavedCartItems();
};
