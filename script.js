const productsPlace = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const emptyButton = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');

const addTotalPrice = async () => {
  const cartItens = document.querySelectorAll('.cart__item');
  let total = 0;
  cartItens.forEach((item) => {
    const text = item.innerHTML;
    let z = 0;
    let price = '';
    for (let index = 0; index < text.length; index += 1) {
      if (z === 1) {
        price += text[index];
      }
      if (text[index] === '$') z = 1;
    }
    total += Number(price);
  });
  totalPrice.innerHTML = total;
};

const clearCartList = () => {
  cartList.innerHTML = '';
  saveCartItems('');
  addTotalPrice();
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartList.innerHTML);
  addTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function appendToCartList(element) {
  const cartItens = document.querySelector('.cart__items');
  cartItens.append(element);
}

function createItens(sku) {
  fetchItem(sku)
    .then((item) => {
      obj = {
        sku: item.id,
        name: item.title,
        salePrice: item.price,
      };
      appendToCartList(createCartItemElement(obj));
      saveCartItems(cartList.innerHTML);
      addTotalPrice();
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    createItens(sku);
  });
  section.appendChild(button);
  return section;
}

function removeLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

function productList() {
  fetchProducts('computador')
    .then((list) => {
      list.forEach((product) => {
        const obj = {
          sku: product.id,
          name: product.title,
          image: product.thumbnail,
        };
        const item = createProductItemElement(obj);
        productsPlace.append(item);
      });
    removeLoading();
  });
}

function addEventToCart() {
  const cartItens = document.querySelectorAll('.cart__item');
  cartItens.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => {
  productList();
  cartList.innerHTML = getSavedCartItems();
  addEventToCart();
  emptyButton.addEventListener('click', clearCartList);
  addTotalPrice();
};
