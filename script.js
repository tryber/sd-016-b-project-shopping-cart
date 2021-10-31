const cartList = document.querySelector('.cart__items');
const clearCartBtn = document.querySelector('.empty-cart');

function clearCart() {
  cartList.innerHTML = '';
  saveCartItems('');
}
clearCartBtn.addEventListener('click', clearCart);

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
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (event) => {
  const section = event.target.parentNode;
  const itemID = getSkuFromProductItem(section);
  const itemInfo = await fetchItem(itemID);
  const itemObject = {
    sku: itemInfo.id,
    name: itemInfo.title,
    salePrice: itemInfo.price,
  };

  const cartItem = createCartItemElement(itemObject);
  cartList.appendChild(cartItem);
  saveCartItems(cartList.innerHTML);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', addToCart);
  section.appendChild(btn);
  
  return section;
}

async function getProducts(product) {
  const fetchedProducts = await fetchProducts(product);
  const itemSection = document.querySelector('.items');
  fetchedProducts.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    itemSection.appendChild(createProductItemElement(itemObject));
  });
}

function loadCart() {
  if (localStorage.length > 0) {
    cartList.innerHTML = getSavedCartItems();
    const itemsList = document.querySelectorAll('.cart__item');
    itemsList.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
}

window.onload = () => {
  getProducts('computador');
  loadCart();
};
