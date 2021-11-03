const cartList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const cleanbutton = document.querySelector('.empty-cart');
let total = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  id = item.querySelector('span.item__sku').innerText;
  return id;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
}

// função que manipula produtos do carrinho
const eventsCartList = () => {
  cartList.innerHTML = getSavedCartItems();
  const list = document.querySelectorAll('.cart__item');
  list.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const getli = document.createElement('li');
  getli.className = 'cart__item';
  getli.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  getli.addEventListener('click', cartItemClickListener);
  return getli;
}

// função que soma o preço total do carrinho

function sumCartItems(price) {
  total += price;
  totalPrice.innerHTML(`Valor lotal:${total}`);
}

// criando os elementos referente ao carrinho

async function addCartProduct(event) {
  const findId = getSkuFromProductItem(event.target.parentNode);
  const data = await fetchItem(findId);
  const addCartItens = createCartItemElement(data);
  cartList.appendChild(addCartItens);
  saveCartItems(cartList.innerHTML);
  sumCartItems(data.price);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const buttons = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttons.addEventListener('click', addCartProduct);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(buttons);
  return section;
}

// chamando a função que cria os componentes html com as informações do produto

async function findInfoProduct() {
  const classItem = document.querySelector('.items');
  const data = await fetchProducts('computador');
  
  data.results.forEach((result) => {
    const itemObj = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const newItem = createProductItemElement(itemObj);
    classItem.appendChild(newItem);
  });  
}

// função para esvaziar o carrinho

const clean = () => {
  cartList.innerHTML = '';
  price.innerHTML = 0;
};

cleanbutton.addEventListener('click', clean);

window.onload = () => { 
  findInfoProduct();
  eventsCartList();
};