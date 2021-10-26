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

function sumToTotalPrice(amount) {
  const currentAmount = Number(localStorage.getItem('totalPrice')) || 0;
  const newAmount = (currentAmount + amount).toFixed(2);

  localStorage.setItem('totalPrice', newAmount);

  return newAmount;
}

function removeFromTotalPrice(amount) {
  const currentAmount = Number(localStorage.getItem('totalPrice')) || 0;
  let newAmount = 0;

  if (currentAmount <= 0 || currentAmount < amount) {
    localStorage.setItem('totalPrice', 0);
    return 0;
  }

  newAmount = (currentAmount - amount).toFixed(2);
  localStorage.setItem('totalPrice', newAmount);

  return newAmount;
}

function displayCartTotalPrice(totalPrice) {
  const totalPriceElement = document.querySelector('.total-price');
  const cartTitleReference = document.querySelector('.cart__title');

  if (totalPriceElement) {
    totalPriceElement.querySelector('p').innerText = totalPrice;
    return;
  }

  const totalPriceWrapper = createCustomElement('section', 'total-price', '');
  const totalPriceText = createCustomElement('p', 'total-price__value', totalPrice);

  totalPriceWrapper.appendChild(totalPriceText);
  cartTitleReference.insertAdjacentElement('afterend', totalPriceWrapper);
}

function handleDisplayTotalPrice(amount, operation) {
  let totalPrice = 0;

  if (!operation) return;

  if (operation === 'sum') totalPrice = sumToTotalPrice(amount);
  else totalPrice = removeFromTotalPrice(amount);

  displayCartTotalPrice(totalPrice);
}

const customRequestPromise = (element) =>
  new Promise((resolve) => setTimeout(resolve, 700)).then(() => {
    const itemsList = element.parentNode.innerHTML;
    const itemPrice = element.getAttribute('data-price');

    handleDisplayTotalPrice(itemPrice, 'sub');
    element.remove();
    saveCartItems(SAVE_ITEMS_KEY, itemsList);
  });

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

async function cartItemClickListener(event) {
  await handleAPIRequest(customRequestPromise, event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('data-price', salePrice);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsToCart(sku) {
  const product = await handleAPIRequest(fetchItem, sku);
  const { id, title: name, price: salePrice } = product;
  const itemCart = createCartItemElement({ sku: id, name, salePrice });

  cartItemsWrapper.appendChild(itemCart);
  saveCartItems(SAVE_ITEMS_KEY, cartItemsWrapper.innerHTML);
  handleDisplayTotalPrice(salePrice, 'sum');
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

function handleEmptyCart() {
  const emptyCartButton = document.querySelector('.empty-cart');

  emptyCartButton.addEventListener('click', () => {
    localStorage.clear();
    cartItemsWrapper.innerHTML = '';
    handleDisplayTotalPrice(0, 'sub');
  });
}

window.onload = () => {
  const savedItemsList = getSavedCartItems();
  const parsedItemsList = document.createRange().createContextualFragment(savedItemsList);

  if (parsedItemsList.querySelector('li')) {
    cartItemsWrapper.appendChild(parsedItemsList);
  }

  handleEmptyCart();
  handleDisplayTotalPrice(0);
  getInitialProducts('computador');
};
