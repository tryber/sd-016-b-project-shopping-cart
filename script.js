// const saveCartItems = require("./helpers/saveCartItems");

const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Requisito 3
function cartItemClickListener(event) {
  // coloque seu código aqui
  // Noções do remove() tiradas de https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  event.target.remove();
  saveCartItems();
}

// Requisito 5: total price
let soma = 0;
totalPrice.innerText = `Valor total: ${soma}`;

function somaValores(item) {
  soma += item;
  totalPrice.innerText = soma;
}

function subtraiValores(item) {
  soma -= item;
  totalPrice.innerText = soma;
}
// fim Requisito 5

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  somaValores(salePrice);
  return li;
}

// function removeItemFromList() {
//   const savedCartItems = document.querySelector('.cart__item');
//   savedCartItems.addEventListener('click', cartItemClickListener);
// }

// Requisito 1
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    // const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// Requisito 2
// pegar querySelector('.item.add) e colocar addEventListener, com click e chamar a função de colocar no carrinho

async function addItem(id) {
  const newFoundItem = await fetchItem(id);
  const product = {
    sku: newFoundItem.id,
    name: newFoundItem.title,
    salePrice: newFoundItem.price,
  };

  const productItem = createCartItemElement(product);
  cartItems.appendChild(productItem);
  saveCartItems();
}

// Noções de parentNode obtidas em https://developer.mozilla.org/pt-BR/docs/Web/API/Node/parentNode
function getId() {
  const items = document.querySelector('.items');
  items.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      const button = event.target;
      const sku = button.parentNode.firstChild.innerText;

      addItem(sku);
    }
  });
}

// Requisito 6: botão esvaziar carrinho
const buttonEsvaziar = document.querySelector('.empty-cart');
buttonEsvaziar.addEventListener('click', () => {
  cartItems.innerText = '';
  totalPrice.innerText = '';
  saveCartItems();
});

window.onload = () => {
  searchProducts('computador');
  getId();
  getSavedCartItems();
  // removeItemFromList();
};
