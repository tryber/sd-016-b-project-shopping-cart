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
  const importData = await fetchProducts('computador  ');

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
const buttonRemove = document.querySelector('.empty-cart');

function createTotalPriceElement() {
  const section = document.createElement('section');
  section.className = 'total-price';
  sectionCart.appendChild(section);
  section.innerText = 'Total: 0';
}

function calculatePrice() {
  const sectionTotalPrice = document.querySelector('.total-price');
  const itemsElements = olCartItems.childNodes;
  let sumPrice = 0;
  
  itemsElements.forEach((tem) => {
    const targetString = tem.innerText;
    const targetPrice = targetString.substring(targetString.indexOf('$') + 1);
    sumPrice += parseFloat(targetPrice);
  });
  
  sectionTotalPrice.innerText = `Total: $${sumPrice.toFixed(2)}`;
}

function clearCartItems() {
  const itemsElements = olCartItems.childNodes;
  
  for (let index = 0; index < itemsElements.length; index += 0) {
    itemsElements[index].remove();
  }

  calculatePrice();
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const itemTarget = event.target;
  const targetString = itemTarget.innerText;
  const targetPrice = targetString.substring(targetString.indexOf('$') + 1);
  
  itemTarget.remove();
  
  calculatePrice();
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
  const targetID = elementTarget.firstChild.innerText;
  
  const shearchItem = await fetchItem(targetID);
  const { id, title, price } = shearchItem;
  const createObject = { sku: id, name: title, salePrice: price };
  
  const CartLi = createCartItemElement(createObject);
  olCartItems.appendChild(CartLi);
  
  calculatePrice(price);
}

buttonRemove.addEventListener('click', clearCartItems);
sectionProducts.addEventListener('click', importCartItem);

window.onload = async () => {
  await createDatajsonSections();
  createTotalPriceElement();
};
