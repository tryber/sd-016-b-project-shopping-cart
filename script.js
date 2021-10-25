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
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Exibe preços
function displaysPrices(total) {
  const message = `Total: ${total}`;
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = '';
  
  const display = document.createElement('span');
  display.innerText = message;
  totalPrice.appendChild(display);
}

// Soma preços
function sumPrices() {
  const cartItem = document.querySelectorAll('.cart__item');
  let sum = 0;
  
  cartItem.forEach((item) => {
    const text = item.innerText;
    const splitPrice = text.split('PRICE: $');
    const priceNumber = parseFloat(splitPrice[1]);
    sum += priceNumber;
  });

  displaysPrices(sum);
}

// Texto carregando
function loadingOnOff(param) {
  const loading = document.querySelector('.loading');
  let text = '';
  if (param === 'on') { text = 'carregando...'; }
  loading.innerText = text;
}

// Parte do requisito 01 - criar os componentes HTML.
async function appendItems() {
  loadingOnOff('on');
  const { results } = await fetchProducts('computador');

  results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement({ sku, name, image }));
  });

  loadingOnOff('');
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function removeFromLocalStorage(skuTarget) {
//   // let cartItems = JSON.parse(localStorage.getItem('cartItems'));
//   // const itemToRemove = cartItems.find(({ sku }) => sku === skuTarget );
//   // const indexToRemove = cartItems.indexOf(itemToRemove);
//   // cartItems.splice(indexToRemove, 1);
//   // localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

function cartItemClickListener(event) {
  event.target.remove();
  // const cartItems = document.querySelector('.cart__items_remove');
  saveCartItems(cartItems.innerHTML);
  sumPrices();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

async function InsertInCart(sku) {
  const dataItem = await fetchItem(sku);
  const { title: name, price: salePrice } = dataItem;
  const li = createCartItemElement({ sku, name, salePrice });

  // const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(li);
  saveCartItems(cartItems.innerHTML);
  sumPrices();
}

// Parte do requisito II - insere item no carrinho ao clicar no botão
function getSku() {
  const items = document.querySelector('.items');
  items.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      const buttonTarget = event.target;
      const sku = buttonTarget.parentNode.firstChild.innerText;

      InsertInCart(sku);
    }
  });
}

// Botão que limpa carrinho
function cleanCart() {
  const emptyCart = document.querySelector('.empty-cart');

  emptyCart.addEventListener('click', () => {
    // const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = '';
    sumPrices();
    saveCartItems(cartItems.innerHTML);
  });
}

function readStorage() {
  const recoveredCartItems = getSavedCartItems();
  // const cartItems = document.querySelector('.cart__items');
  
  if (cartItems !== null) {
    cartItems.innerHTML = recoveredCartItems;
    cartItems.addEventListener('click', (event) => {
      event.target.remove();
      saveCartItems(cartItems.innerHTML);
    });
  }
}

window.onload = () => { 
  appendItems();
  getSku();
  // getSavedCartItems();
  readStorage();
  sumPrices();
  cleanCart();
};
