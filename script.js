const items = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');
const sumPrices = document.querySelector('.total-price');
const clearCart = document.querySelector('.empty-cart');
const body = document.querySelector('.container');

const emptyCart = () => {
  cartItem.innerHTML = ' ';
  sumPrices.innerHTML = '0';
  saveCartItems(cartItem.innerHTML);
};

clearCart.addEventListener('click', emptyCart);

const totalPriceUpdate = async () => {
  let value = 0;
  for (let i = 0; i < cartItem.children.length; i += 1) {
    const child = cartItem.children[i];
    value += Number(child.getAttribute('price'));
  }
  sumPrices.innerHTML = `${parseFloat(value)}`;
};

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  totalPriceUpdate();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('price', salePrice);
  return li;
}

const loadStorage = () => {
  const loading = getSavedCartItems();
  if (loading) {
    cartItem.innerHTML = loading;
  }
  totalPriceUpdate();
};

const loadPage = async () => {
  const loagindAPI = document.createElement('div');
  loagindAPI.className = 'loading';
  loagindAPI.innerText = 'Carregando...';
  body.appendChild(loagindAPI);
  await fetchProducts('computador')
    .then((data) => data.results)
    .then((products) => {
    products.forEach((product) => {
      const item = createProductItemElement(product);
      items.appendChild(item);
    });
  });
  body.removeChild(loagindAPI);
};

const addItemOnCart = (id) => {
  fetchItem(id)
    .then((products) => {
      const ItemOnCart = createCartItemElement(products);
      cartItem.appendChild(ItemOnCart);
      saveCartItems(cartItem.innerHTML);
      totalPriceUpdate();
    });
};

const addProduct = (event) => {
  if (event.target.classList.contains('item__add')) {
    const id = event.target.parentNode.firstChild.innerText;
    addItemOnCart(id);
  }
};

window.onload = () => { 
  loadPage();
  items.addEventListener('click', addProduct);
  cartItem.addEventListener('click', cartItemClickListener);
  loadStorage();
};
