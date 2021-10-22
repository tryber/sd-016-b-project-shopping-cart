const items = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');

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

function cartItemClickListener() { }

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

async function searchProducts(product) {
   const searchData = await fetchProducts(product);
   searchData.results.forEach((item) => {
   const itemObject = createProductItemElement(item);
   items.appendChild(itemObject);
  });
}

async function putItemCart(id) {
  const products = await fetchItem(id);
  const putCartItem = createCartItemElement(products);
  cartItem.appendChild(putCartItem);
}

const putProduct = (event) => {
  if (event.target.classList.contains('item__add')) {
    const id = event.target.parentElement.childNodes[0].innerText;
    putItemCart(id);
  }
};

window.onload = () => { 
  searchProducts('computador');
  items.addEventListener('click', putProduct);
};