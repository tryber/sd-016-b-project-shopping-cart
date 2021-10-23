const cleanButtonCart = document.querySelector('.empty-cart');
const cartItems = document.querySelector('.cart__items');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const liItem = event.target;
  const olCart = liItem.parentNode;
  olCart.removeChild(liItem);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function clickCartItem(event) {
  const sectionItem = event.target.parentElement;
  const Id = sectionItem.firstChild.innerText;
  const idItems = await fetchItem(Id);
  const cartItemsElements = {
    sku: Id,
    name: idItems.title,
    salePrice: idItems.price,
  };
  cartItems.appendChild(createCartItemElement(cartItemsElements));
  saveCartItems(cartItems.innerHTML);
}

async function searchProduct(product) {
  const Items = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  Items.results.forEach((productItems) => {
  const objItems = {
    sku: productItems.id,
    image: productItems.thumbnail,
    name: productItems.title,
  };
  sectionItems.appendChild(createProductItemElement(objItems));
});
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', clickCartItem);
});
saveCartItems(cartItems.innerHTML);
}

function clearCart() {
  cartItems.innerText = '';
}

function eventClickList() {
  for (let i = 0; i < document.getElementsByTagName('li').length; i += 1) {
    document.getElementsByTagName('li')[i].addEventListener('click', cartItemClickListener);
  }
}

const olHTML = getSavedCartItems();
cartItems.innerHTML = olHTML;

window.onload = () => {
  searchProduct('computador'); 
  cleanButtonCart.addEventListener('click', clearCart);
  eventClickList();
};
