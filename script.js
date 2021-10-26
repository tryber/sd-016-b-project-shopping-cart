const allProductsInCart = document.querySelector('.cart__items');
const clearShoppingCartButton = document.querySelector('.empty-cart');
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const retrievesProductPriceInCart = (product) => {
  const productPrice = product.slice(-10).replace(/[^0-9.]/g, '');
  console.log(productPrice);
  return Number(productPrice);
};

const totalCartValue = () => {
  const allProductsCart = [...document.querySelectorAll('.cart__item')];
  const totalValue = allProductsCart
    .map((product) => retrievesProductPriceInCart(product.innerText))
    .reduce((acc, currentPrice) => (acc + currentPrice), 0);

  document.querySelector('.total-price').innerText = totalValue;
};

function createCustomElement(element, className, innerText, butaoAction) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (butaoAction) {
    e.addEventListener(butaoAction.event, butaoAction.callsTheAddProductToCartFunction);
  }
  return e;
}

function cartItemClickListener(event) {
  const selectedProduct = event.target;
  selectedProduct.remove();
  totalCartValue();
  saveCartItems(allProductsInCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductToCart = async (idItem) => {
  const shoppingCart = document.querySelector('.cart__items');
  await fetchItem(idItem)
    .then(createCartItemElement)
    .then((item) => shoppingCart.appendChild(item));

  totalCartValue();
  saveCartItems(allProductsInCart.innerHTML);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button',
    'item__add',
    'Adicionar ao carrinho!',
    { event: 'click', callsTheAddProductToCartFunction: () => addProductToCart(sku) }));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const loadProducts = async (category) => {
  await fetchProducts(category)
    .then((products) => {
      const items = document.querySelector('.items');
      products.forEach((product) => {
        const item = createProductItemElement(product);
        items.appendChild(item);
      });
    });
};

const loadProductsInCart = () => {
  const allCachedProducts = getSavedCartItems();
  allProductsInCart.innerHTML = allCachedProducts;
  totalCartValue();
};

const addEventListener = () => {
  document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('cart__item')) {
      cartItemClickListener(event);
    }
  });
};

const clearShoppingCart = () => {
  clearShoppingCartButton.addEventListener('click', function () {
    allProductsInCart.innerHTML = '';
    totalCartValue();
    saveCartItems(allProductsInCart.innerHTML);
  });
};

window.onload = () => { 
  loadProducts('computador'); 
  loadProductsInCart();
  addEventListener();
  clearShoppingCart();
};
