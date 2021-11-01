const ol = document.querySelector('.cart__items');
const buttonClearCart = document.querySelector('.empty-cart');
const allCartItens = document.querySelector('.cart__items');

// Apoio Gabriel Pinheiro e André Mello, para criar a função. 
// A função é chamada sempre que há atualização no carrinho.
const totalCartPrice = () => {
  const totalPrice = document.querySelector('.total-price');
  let counter = 0;
  for (let index = 0; index < allCartItens.children.length; index += 1) {
    const childrenList = allCartItens.children[index];
    counter += Number(childrenList.innerHTML.split('$').pop());
  }
  totalPrice.innerHTML = counter;
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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML);
  totalCartPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// Apoio Tales Coelho, para criar const id.
// Apoio Gabriel Pinheiro e Ellen Santos para ajustar erro no código.
async function getItemId(item) {
  const id = item.target.parentNode.firstChild.innerText;
  const dataItem = await fetchItem(id);
  const objItem = {
    sku: dataItem.id,
    name: dataItem.title,
    salePrice: dataItem.price,
  };
  const cartItem = createCartItemElement(objItem);
  ol.appendChild(cartItem);
  saveCartItems(ol.innerHTML);
  totalCartPrice();
}

// Capturar botões e add escutador em cada um.
function clickButton() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      getItemId(event);
    });
  });
}

// Chama a função getSavedCartItems e add a ol. Add escutador a nova lista criada em que chama cartItemClickListener (função que exclui item ao ser clicado). Apoio Tonis Torres.
function recoverLocalStorage() {
  ol.innerHTML = getSavedCartItems();
  ol.addEventListener('click', cartItemClickListener);
}

buttonClearCart.addEventListener('click', () => {
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
  totalCartPrice();
});

// Apoio André Mello para ajustar erro no código.
const loading = document.createElement('p');
const addLoading = () => {
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  document.body.appendChild(loading);
};

// Apoio  Gian Fritsche para ajustar async/await.
async function allFunc() {
  addLoading();
  await searchProducts('computador')
    .then(() => clickButton())
    .then(() => recoverLocalStorage());
  document.body.removeChild(loading);
  totalCartPrice();
}

window.onload = () => {
  allFunc();
};
