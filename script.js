const sectionProducts = document.querySelector('.items');
const sectionCartItems = document.querySelector('.cart__items');

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

async function createDatajsonSections() {
  const getItemsClass = document.querySelector('.items');
  const importData = await fetchProducts('computador');

  const dataItens = importData.results.map((product) => {
    return {
      sku: product.id,
      name: product.title,
      image: product.thumbnail };
  });

  dataItens.forEach((item) => {
    getItemsClass.appendChild(createProductItemElement(item));
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
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

  return sectionCartItems.appendChild(CartLi);
}

window.onload = async () => {
  sectionProducts.addEventListener('click', importCartItem);
  
  await createDatajsonSections();
};
