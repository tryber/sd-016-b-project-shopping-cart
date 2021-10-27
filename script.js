function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// inspirado por Jonhathan Passos.
async function addToCart(event) {
  const getID = getSkuFromProductItem(event.target.parentNode);
  const prod = await fetchItem(getID);
  const sendToCart = createCartItemElement(prod);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(sendToCart);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // inspirado por Jonhathan Passos.
  const makeButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  makeButton.addEventListener('click', addToCart);
  section.appendChild(makeButton);

  return section;
}
// Inspirado por Danilo Couto https://github.com/tryber/sd-016-b-project-shopping-cart/pull/99/commits/be65c644762c9dc5dbe385248f2cf3c1a23ed532
function loadOn() {
  const productItem = document.querySelector('.items');
  const load = document.createElement('h2');
  load.className = 'loading';
  productItem.appendChild(load);
  load.innerText = 'carregando...';
}

function loadOff() {
  const load = document.querySelector('.loading');
  load.remove();
}

async function searchProduct(product) {
  loadOn();
  const searchData = await fetchProducts(product);
  const addItemsToSite = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    addItemsToSite.appendChild(productItem);
  });
  loadOff();
}

function clearCart() {
  const getList = document.querySelector('.cart__items');
  const getButt = document.querySelector('.empty-cart');
  getButt.addEventListener('click', () => {
    // retirado de: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (getList.firstChild) {
      getList.firstChild.remove();
    }
  });
}

window.onload = () => { 
  searchProduct('computador');
  clearCart();
};
