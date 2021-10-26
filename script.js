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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const totalPrice = document.querySelector('.price');
  const value = event.target.innerText.substring(
    event.target.innerText.indexOf('$') + 1, event.target.innerText.length,
  );
  totalPrice.innerText = parseFloat(totalPrice.innerText) - value;
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const totalPrice = document.querySelector('.price');
  totalPrice.innerText = parseFloat(totalPrice.innerText) + salePrice;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  const li = event.target.parentElement.firstChild.innerText;
  await fetchItem(li)
  .then((data) => {
    cartItems.appendChild(createCartItemElement(data));
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', addItemToCart);
  
  return section;
}

async function searchProducts(product) {
  const sectionItems = document.querySelector('.items');
  const searchData = await fetchProducts(product);
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

function emptyCart() {
  const ol = document.querySelector('.cart__items');
  while (ol.firstChild) {
    ol.removeChild(ol.firstChild);
  }
  document.querySelector('.price').innerText = 0;
}

function emptyShoppingCart() {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', emptyCart);
}

window.onload = () => { 
  searchProducts('computador');
  emptyShoppingCart();
};
