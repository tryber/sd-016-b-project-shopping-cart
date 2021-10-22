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

// REQUISITO 1 -funcao que adiciona os items
function getProduct(product) {
  const itemsSection = document.querySelector('.items');

  fetchProducts(product)
    .then((response) => response.results.map((element) => {
      const { id: sku, title: name, thumbnail: image } = element;

      return {
        sku,
        name,
        image,
      };
    }))
    .then((data) => data.forEach((element) => {
      const item = createProductItemElement(element);
      itemsSection.appendChild(item);
    }));
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function totalPrice() {
  const currentValue = document.querySelector('.total-price');
  currentValue.innerText = 0;
  const regExp = /MLB[0-9]{9}[0-9]?/;
  
  document.querySelectorAll('.cart__item')
    .forEach(async (item) => {
      const itemInfo = item.innerText;
      const result = itemInfo.match(regExp);
      const product = await fetchItem(result[0]);
      currentValue.innerText = Number(currentValue.innerText) + product.price;
    });
}

// REQUISITO 3
function cartItemClickListener(event) {
  if (event.target.classList.contains('cart__item')) {
    const parent = event.target.parentElement;
    parent.removeChild(event.target);
    totalPrice();
    saveCartItems(parent.outerHTML);
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

// REQUISITO 2 - funcao que adiciona os items ao carrinho
async function addItemToCart(event) {
  const cartItems = document.querySelector('.cart__items');
  if (event.target.classList.contains('item__add')) {
    const itemID = event.target.parentElement.firstChild.innerText;
    const product = await fetchItem(itemID);
    const productInfo = {
      sku: itemID,
      name: product.title,
      salePrice: product.price,
    };
    const li = createCartItemElement(productInfo);
    cartItems.appendChild(li);
    saveCartItems(cartItems.outerHTML);
    totalPrice();
  }
}

function handleCartProducts() {
  document.addEventListener('click', addItemToCart);
}

function removeItemFromCart() {
  const cartItems = document.querySelector('.cart__items');
  cartItems.addEventListener('click', cartItemClickListener);
}

window.onload = () => {
  getSavedCartItems();
  removeItemFromCart();
  totalPrice();
  getProduct('computador');
  handleCartProducts();
};
