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

function cartItemClickListener(event) {
  const getOl = document.querySelector('.cart__items');
  getOl.removeChild(event.target);
} 

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} 

async function addProductToCart(event) {
  const getSKU = getSkuFromProductItem(event.target.parentNode);
  const getArr = await fetchItem(getSKU);
  const getOl = document.querySelector('.cart__items');
  const getCartItens = createCartItemElement(getArr);
  getOl.appendChild(getCartItens);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
const newButton = createCustomElement('button', 'item_add', 'Adicionar ao carrinho!');
newButton.addEventListener('click', addProductToCart);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(newButton);

  return section;
}

const objectF = async () => {
  const arrProducts = await fetchProducts('computador');
  arrProducts.forEach((arr) => {
    const getItens = document.querySelector('.items');
    const createArray = createProductItemElement(arr);
    getItens.appendChild(createArray);
  });
};

window.onload = () => {
objectF();
cartItemClickListener();
 };
