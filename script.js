const clearBtn = document.querySelector('.empty-cart');
const cartListItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function justNumbers(text) {
  const numbers = text.replace(/[^0-9]/g, '');
  return numbers;
}

const updatePrice = () => {
  const items = cartListItems.children;
  let sumItems = 0;
  for (let index = 0; index < items.length; index += 1) {
    const text = items[index].innerText;
    const textSplit = text.split('|');
    const catchPrice = textSplit[2];
    // console.log(text.substr(-7));
    sumItems += Number(justNumbers(catchPrice));
  }
  totalPrice.innerText = sumItems;
  if (sumItems === 0) totalPrice.innerText = '';
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();

  saveCartItems(cartListItems.innerHTML);
  updatePrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const sum = async (price) => {
  const total = await totalPrice.innerText;
  let subtotal = 0;
  if (total !== '') {
    subtotal = Number.parseFloat(total);
  }
  subtotal += Number.parseFloat(price);
  console.log(subtotal);
 totalPrice.innerText = subtotal.toFixed(1);
};

const addToCart = async (event) => {
  const id = event.target.parentElement.firstElementChild.innerText;
  // console.log(id);
  const search = await fetchItem(id);
  // console.log(search);
  const obj = {
    sku: search.id,
    name: search.title,
    salePrice: search.price.toFixed(1),
  };
  const result = createCartItemElement(obj);
  cartListItems.appendChild(result);

  sum(obj.salePrice);

  saveCartItems(cartListItems.innerHTML);
};

// const addToCart = async (productId) => {
//   const search = await fetchItem(productId);
//   // console.log(search);
//   const obj = {
//     sku: search.id,
//     name: search.title,
//     salePrice: search.price.toFixed(1),
//   };
//   const result = createCartItemElement(obj);
//   cartListItems.appendChild(result);

//   sum(obj.salePrice);

//   saveCartItems(cartListItems.outerHTML);
// };

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addToCart);
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function searchProducts(product) {
  loading.innerHTML = 'carregando';

  const searchData = await fetchProducts(product);

  loading.remove();

  const sectionItems = document.querySelector('.items');

  searchData.results.forEach((element) => {
    const productItem = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const section = createProductItemElement(productItem);
    sectionItems.appendChild(section);
  });
}

/* Limpa o carrinho */
clearBtn.addEventListener('click', function () {
  cartListItems.innerHTML = '';
  saveCartItems(cartListItems.innerHTML);
  totalPrice.innerText = '';
});

const loadCartItems = () => {
  const cartList = getSavedCartItems();
  // console.log(cartList);
  cartListItems.innerHTML = cartList;
  // console.log(cartList);
  cartItemClickListener();
};

window.onload = () => {
  // loadCartItems();
  searchProducts('computador');
};
