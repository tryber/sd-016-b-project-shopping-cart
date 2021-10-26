const SAVE_ITEMS_KEY = 'cartItems';
const cartItemsWrapper = document.querySelector('.cart__items');

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

function cartItemClickListener(event) {
  const itemList = event.target.parentNode.innerHTML;

  event.target.remove();
  saveCartItems(SAVE_ITEMS_KEY, itemList);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function calculateTotalPrice(amount) {
  const currentAmount = Number(localStorage.getItem('totalPrice')) || 0;
  const newAmount = (currentAmount + amount).toFixed(2);

  localStorage.setItem('totalPrice', newAmount);

  return newAmount;
}

function displayCartTotalPrice(total) {
  const totalPriceElement = document.querySelector('.total-price');
  const cartTitleReference = document.querySelector('.cart__title');

  if (total <= 0) return;

  if (totalPriceElement) { 
    totalPriceElement.querySelector('p').innerText = total;
    return;
  }

  const totalPriceWrapper = createCustomElement('section', 'total-price', '');
  const totalPriceText = createCustomElement('p', 'total-price__value', total);

  totalPriceWrapper.appendChild(totalPriceText);
  cartTitleReference.insertAdjacentElement('afterend', totalPriceWrapper);
}

function handleDisplayTotalPrice(amount) {
  const totalPrice = calculateTotalPrice(amount);

  displayCartTotalPrice(totalPrice);
}

function handleRequestLoading(isLoading) {
  const loadingElement = createCustomElement('section', 'loading', 'Carregando...');
  const documentBody = document.querySelector('body');

  if (isLoading) documentBody.appendChild(loadingElement);
  else documentBody.querySelector('.loading').remove();
}

function handleAPIRequest(request, ...args) {
  handleRequestLoading(true);
  return request(...args)
    .then((response) => {
      handleRequestLoading(false);
      return response;
    })
    .catch((error) => {
      console.log('[Error on fetching data]: ', error);
    });
}

async function addItemsToCart(sku) {
  const product = await handleAPIRequest(fetchItem, sku);
  const { id, title: name, price: salePrice } = product;
  const itemCart = createCartItemElement({ sku: id, name, salePrice });

  cartItemsWrapper.appendChild(itemCart);
  saveCartItems(SAVE_ITEMS_KEY, cartItemsWrapper.innerHTML);
  handleDisplayTotalPrice(salePrice);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const addToCartButton = section.querySelector('.item__add');

  addToCartButton.addEventListener('click', () => addItemsToCart(sku));

  return section;
}

async function getInitialProducts(query) {
  const response = await handleAPIRequest(fetchProducts, query);
  const itemsWrapper = document.querySelector('.items');

  response.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const formattedProduct = createProductItemElement({ sku, name, image });

    itemsWrapper.append(formattedProduct);
  });
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function convertSavedListToDomElements(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');

  return Array.from(doc.body.children);
}

function reloadCurrentCartItemsList(cartItemsList) {
  cartItemsList.forEach((item) => cartItemsWrapper.append(item));
}

function handleEmptyCart() {
  const emptyCartButton = document.querySelector('.empty-cart');

  emptyCartButton.addEventListener('click', () => {
    cartItemsWrapper.innerHTML = '';
  });
}

window.onload = () => {
  const savedList = getSavedCartItems('cartItems');
  const cartItemsList = convertSavedListToDomElements(savedList);

  handleEmptyCart();
  handleDisplayTotalPrice(0);
  getInitialProducts('computador');
  reloadCurrentCartItemsList(cartItemsList);
};
