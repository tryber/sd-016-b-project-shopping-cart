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

const sectionProducts = document.querySelector('.items');

async function createDatajsonSections() {
  const getItemsClass = document.querySelector('.items');
  const importData = await fetchProducts('computador');

  const dataItens = importData.results.map((product) => {
    const createObject = { sku: product.id, name: product.title, image: product.thumbnail };
    return createObject;
  });

  dataItens.forEach((item) => {
    getItemsClass.appendChild(createProductItemElement(item));
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const olCartItems = document.querySelector('.cart__items');
const sectionCart = document.querySelector('.cart');
const sectionTotalPrice = document.querySelector('.total-price');
const buttonRemove = document.querySelector('.empty-cart');
let sumPrice = 0;

function calculatePrice(number) {
  const section = document.createElement('section');
  
  section.className = 'total-price';
  sectionCart.appendChild(section);
  
  sumPrice += number;

  // sectionTotalPrice.innerText = sumPrice;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const itemTarget = event.target;
  const targetString = itemTarget.innerText;
  const targetPrice = targetString.substring(targetString.indexOf('$') + 1);

  calculatePrice(parseFloat(-(targetPrice)));

  return itemTarget.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function importCartItem(event) {
  if (event.target.className !== 'item__add') return null;
  
  const elementTarget = event.target.parentNode;
  const targetID = elementTarget.children[0].innerText;
  
  const shearchItem = await fetchItem(targetID);
  const { id, title, price } = shearchItem;
  const createObject = { sku: id, name: title, salePrice: price };
  
  const CartLi = createCartItemElement(createObject);
  await calculatePrice(+(createObject.price));
  
  return olCartItems.appendChild(CartLi);
}

sectionProducts.addEventListener('click', importCartItem);

window.onload = async () => {
  await createDatajsonSections();
};
