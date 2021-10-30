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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
  return event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function generateItem(nameItem) {
  const containerCartItems = document.querySelector('.cart__items');
  const item = await fetchItem(nameItem);
  const itemObject = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const itemElement = createCartItemElement(itemObject);
  containerCartItems.appendChild(itemElement);
  saveCartItems(containerCartItems.innerHTML);
}

function addToBag(item) {
  item.addEventListener('click', (event) => {
    const elementParent = event.target.parentElement;
    const itemSKU = elementParent.querySelector('.item__sku').innerText;
    generateItem(itemSKU);
  });
}

function selectAllBtn() {
  const btnAddToCart = document.querySelectorAll('.item__add');
  btnAddToCart.forEach((element) => {
    addToBag(element);
  });
}

async function getProduct(product) {
  const products = await fetchProducts(product);
  const { results } = products;
  const containerItems = document.querySelector('.items');
  
  results.forEach((element) => {
    const productObject = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const productElement = createProductItemElement(productObject);
    containerItems.appendChild(productElement);
  });
  selectAllBtn();
}

window.onload = () => {
  getProduct('computador');
  const recoverItems = getSavedCartItems();
  if (recoverItems !== null) {
    const cartModal = document.querySelector('.cart__items');
    cartModal.insertAdjacentHTML('beforeend', recoverItems);

    const allItems = document.querySelectorAll('.cart__item');
    allItems.forEach((element) => {
      element.addEventListener('click', cartItemClickListener);
    });
  }
};
