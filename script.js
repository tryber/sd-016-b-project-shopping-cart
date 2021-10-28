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

function calculateTotalPrice() {
  const totalPrice = Array.from(cartItemsWrapper.children).reduce((acc, item) => {
    const priceSignIndex = item.innerHTML.lastIndexOf('$') + 1;
    const priceValue = item.innerHTML.slice(priceSignIndex);

    return acc + Number(priceValue);
  }, 0);

  return totalPrice;
}

function handleDisplayTotalPrice() {
  const totalPriceWrapper = document.querySelector('.total-price');
  const totalPriceElement = totalPriceWrapper.querySelector('p');

  totalPriceElement.innerText = calculateTotalPrice();
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

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(SAVE_ITEMS_KEY, cartItemsWrapper.innerHTML);
  handleDisplayTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('data-price', salePrice);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsToCart(event) {
  const sku = event.target.parentNode.querySelector('.item__sku').innerText;
  const product = await handleAPIRequest(fetchItem, sku);
  const { id, title: name, price: salePrice } = product;
  const itemCart = createCartItemElement({ sku: id, name, salePrice });

  cartItemsWrapper.appendChild(itemCart);
  saveCartItems(SAVE_ITEMS_KEY, cartItemsWrapper.innerHTML);
  handleDisplayTotalPrice();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const addToCartButton = section.querySelector('.item__add');

  addToCartButton.addEventListener('click', addItemsToCart);

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
    handleDisplayTotalPrice();
  });
}

function createTotalPriceElement() {
  const cartTitleReference = document.querySelector('.cart__title');
  const totalPriceWrapper = createCustomElement('section', 'total-price', '');
  const totalPriceText = createCustomElement('p', 'total-price__value', '');

  totalPriceWrapper.appendChild(totalPriceText);
  cartTitleReference.insertAdjacentElement('afterend', totalPriceWrapper);
}

window.onload = () => {
  const savedItemsList = getSavedCartItems();
  const parsedItemsList = document.createRange().createContextualFragment(savedItemsList);
  const reloadedItems = parsedItemsList.querySelectorAll('.cart__item');

  reloadedItems.forEach((item) => item.addEventListener('click', cartItemClickListener));

  if (parsedItemsList.querySelector('li')) {
    cartItemsWrapper.appendChild(parsedItemsList);
  }

  handleEmptyCart();
  createTotalPriceElement();
  handleDisplayTotalPrice();
  getInitialProducts('computador');
};
