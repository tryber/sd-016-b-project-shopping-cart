const totalPriceHtml = (num) => {
  // console.log(num);
  const priceTag = document.querySelector('.total-price');
  priceTag.innerText = num.toFixed(2);
};

totalPriceHtml(0);

// const appendSum = () => {
//   const father = document.querySelector('.cart');
//   const div = document.createElement('div');
//   father.appendChild(div);
//   div.className = 'total-price';
// }

// Como referência o código do amigo Gabriel Pinheiro, que usou como fonte https://stackoverflow.com/questions/37556240/get-everything-after-first-character
// const totalPrice = () => {
//   const totalDiv = document.querySelector('.total-price');
//   let sum = 0;
//   const cartItems = document.getElementsByClassName('cart__item');
//   for (let i = 0; i < cartItems.length; i += 1) {
//     sum += Number(cartItems[i].innerHTML.split('$').pop());
//   }
//   totalDiv.innerHTML = sum;
// };

const totalPrice = () => {
  const productsIds = JSON.parse(localStorage.getItem('cartItems'));
  if (productsIds.length > 0) {
    let acc = 0;
    productsIds.forEach((id) => fetchItem(id)
      .then((element) => { totalPriceHtml(acc += element.base_price); }));
  } else totalPriceHtml(0); // Faz com que o preço se atualize para 0 caso a condição acima não seja atendida
};

const localStorageNull = () => {
  if (localStorage.getItem('cartItems') === null) localStorage.setItem('cartItems', '[]');
};

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const parentSection = document.querySelector('.items');
  
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  parentSection.appendChild(section);

  // return section;
}

const createProductRotation = async () => {
  const itensArray = await fetchProducts('computador');
  itensArray.results.forEach((item) => createProductItemElement(item));
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const currentOl = () => document.querySelector('.cart__items');

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(currentOl());
  totalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  const cart = document.querySelector('.cart__items');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cart.appendChild(li);
  saveCartItems(currentOl());
  totalPrice();
}

const addToCart = () => {
  const buttons = document.querySelector('.items');
  buttons.addEventListener('click', (event) => {
    if (event.target.className !== 'item__add') return;
    const idByParent = event.target.parentNode.querySelector('.item__sku').innerText;
    fetchItem(idByParent).then((data) => createCartItemElement(data));
  });
};

const cartOnRefresh = () => {
  const arrayFromLocal = JSON.parse(getSavedCartItems());
  // console.log(arrayFromLocal);
  arrayFromLocal.forEach((id) => fetchItem(id)
    .then((element) => createCartItemElement(element)));
};

// const emptyCartBtn = () => {

// }

// const totalPrice = () => {
//   const nodeFather = currentOl();
//   if 
// }

// localStorageNull();
// createProductRotation();
// addToCart();
// cartOnRefresh();

window.onload = () => {
  localStorageNull();
  createProductRotation();
  addToCart();
  cartOnRefresh();
  // appendSum();
  // totalPrice();
};
