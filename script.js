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

async function addItemsToCart(sku) {
  const cartItemsWrapper = document.querySelector('.cart__items')
  const product = await fetchItem(sku)
  const { id, title: name, price: salePrice } = product
  const itemCart = createCartItemElement({ sku: id, name, salePrice })

  cartItemsWrapper.appendChild(itemCart)
  saveCartItems(cartItemsWrapper)
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const addToCartButton = section.querySelector('.item__add')

  addToCartButton.addEventListener('click', () => addItemsToCart(sku))

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const parent = event.target.parentNode

  event.target.remove()
  saveCartItems(parent)
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getInitialProducts(query) {
  const response = await fetchProducts(query)
  const itemsWrapper = document.querySelector('.items')

  response.results.forEach(product => {
    const { id: sku, title: name, thumbnail: image } = product
    const formattedProduct = createProductItemElement({ sku, name, image })

    itemsWrapper.append(formattedProduct)
  })
}

window.onload = () => {
  getSavedCartItems('cartItems')
  getInitialProducts('computador')
}
