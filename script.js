const olCart = document.querySelector('.cart__items');
const butEmpty = document.querySelector('.empty-cart');

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
  const li = event.target;
  li.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  butEmpty.addEventListener('click', () => {
    olCart.innerHTML = '';
    localStorage.clear();
  });
  return li;
}

async function addItemCart(id) {
  await fetchItem(id)
    .then((item) => {
      const { id: sku, title: name, price: salePrice } = item;
      olCart.appendChild(createCartItemElement({ sku, name, salePrice }));  
      saveCartItems(JSON.stringify(olCart.innerHTML));
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const but = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  but.addEventListener('click', () => {
    addItemCart(sku);
  });
  section.appendChild(but);
  return section;
}

// const emptyCart = () => {
//     butEmpty.addEventListener('click', () => {
//       olCart.innerHTML = '';
//     localStorage.removeItem('cartItems');
//     });
// };

async function searchProducts(product) {
  const data = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  data.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    sectionItem.appendChild(createProductItemElement({ sku, name, image }));
  });
}

const updateCartList = () => {
  const getCartList = JSON.parse(getSavedCartItems());
  console.log(getCartList);
  olCart.innerHTML = getCartList;
  
  butEmpty.addEventListener('click', () => {
    olCart.innerHTML = '';
    localStorage.clear();
  });

  itemCart = document.querySelectorAll('.cart__item');
  itemCart.forEach((item) => {
    item.addEventListener('click', () => {
      item.remove();
    });
  });
};

window.onload = () => {
  searchProducts('computador');
  updateCartList();
};
