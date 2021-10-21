const allItemsInCart = document.querySelector('.cart__items');
const cartItemsSection = document.querySelector('.cart');
const cleanButton = document.querySelector('.empty-cart');

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
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// regex para retornar somente números. Fonte: https://stackoverflow.com/questions/30607419/return-only-numbers-from-string/30607466
// https://stackoverflow.com/questions/9799505/allow-only-numbers-and-dot-in-script
// const teste = document.querySelectorAll('.cart__item')[0].innerText
// const teste2 = teste.slice(-10);
// const teste 3 = teste2.replace(/\D/g, "");
// teste5.replace(/[^0-9\.]/g,''

const catchPrice = (str) => {
  const priceTextHandly = str.slice(-10);
  const valueText = priceTextHandly.replace(/[^0-9.]/g, '');
  const valueNumber = Number(valueText);
  return valueNumber;
};

const sumItems = () => {
  const allItems = [...document.querySelectorAll('.cart__item')];
  const mapValues = allItems.map((item) => catchPrice(item.innerText));
  const prices = mapValues.reduce((sum, actPrice) => (sum + actPrice), 0);
  return prices;
};

const addTotalToPage = () => {
  document.querySelector('.total-price').innerText = sumItems();
};

// const addSumToTotal = () => {
//   const totalPrice = document.querySelector('total-price');
//   const sumTotal = sumItems();
//   totalPrice.appendChild((createCustomElement('div', 'subTotal', sumTotal)));
// };

function cartItemClickListener(event) {
  const eT = event.target;
  eT.remove();
  addTotalToPage();
  saveCartItems(allItemsInCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const productsArray = async () => {
  const products = await fetchProducts('computador');
  const itemsElemente = document.getElementsByClassName('items')[0];
  products.results.forEach((product) => {
    const products2 = createProductItemElement(product);
    itemsElemente.appendChild(products2);
    // console.log(product);
  });
};

function getId(e) {
  const innerTxtId = e.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addItemCartElement = async (id) => {
  const prod = await fetchItem(id);
  const prodAdded = createCartItemElement(prod);
  document.getElementsByClassName('cart__items')[0].appendChild(prodAdded);
  addTotalToPage();
  saveCartItems(allItemsInCart.innerHTML);
};

function loadItemsInCart() {
  const iHTMLcartI = getSavedCartItems();
  allItemsInCart.innerHTML = iHTMLcartI;
}

function addLoading() {
  document.querySelector('body').appendChild(createCustomElement('div', 'loading', 'loading...'));
}

function removeLoading() {
  document.querySelector('.loading').remove();
}

// código do https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript event delegation.

function eventListeners() {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      addItemCartElement(getId(e));
    }
    if (e.target && e.target.classList.contains('cart__item')) {
      cartItemClickListener(e);
    }
  });
}

/* depois de entender melhor como funciona as promisses através do MDN: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
Entender a diferença entre async, await e o then: https://www.youtube.com/watch?v=U_eGa7LEsDk&ab_channel=RogerMelo
A princípio tentei fazer com async e await, mas não deu certo, acredito que deve ser porque teria que chamar a função fetch diretamente.
Após entender melhor como funciona as promisses, consegui escrever o código.
Primeiro inicia criando a classe loading.
depois inicia as promisses, enquanto não acabar os processos, o loading fica na tela. Depois que última promisse for cumprida, remove o loading.

A questão foi a mais desafiante, precisei rever as aulas, até entender todo processo, mas no fim valeu a pena.
*/

const allFunctionOnLoad = () => {
  addLoading();
  productsArray()
    .then(() => loadItemsInCart())
    .then(() => eventListeners())
    .then(() => removeLoading());
};

window.onload = () => {
  allFunctionOnLoad();
  cartItemsSection.appendChild(createCustomElement('div', 'total-price', ''));
};

cleanButton.addEventListener('click', function () {
  allItemsInCart.innerHTML = '';
  document.querySelector('.total-price').innerText = '';
  saveCartItems(allItemsInCart.innerHTML);
});

// window.addEventListener('change', saveCartItems);
