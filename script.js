const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart__items');
const emptybutton = document.querySelector('.empty-cart');
const productsSection = document.querySelector('.container');
/// Nota: em algumas funções para capturar os nodes como um array foi implementado o spread operator antes da node list [... nodelist]
// essa recomendação foi dada pelos alunos Gabriel Pinheiro e Israel Santana que estavam na sala da mentória da Ellen, por volta das 17:00;
const appendLoading = () => {
  const loadingMsg = document.createElement('section');
  loadingMsg.className = 'loading';
  loadingMsg.innerText = 'carregando...';
  productsSection.appendChild(loadingMsg);
};

const fadeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

const sum = (acc, number) => acc + number;

const itemsTotal = () => {
  const total = document.querySelector('.total-price');
  const [...selectedItems] = cartItems.children;
  const costArray = [];
  selectedItems.map((item) => costArray.push(Number(item.innerHTML.split('$').pop())));
  const totalCost = costArray.reduce(sum, 0);
  total.innerHTML = totalCost;
};

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  itemsTotal();
}
const reenableLoadedItems = () => {
  const lis = document.getElementsByClassName('cart__item');
  [...lis].forEach((li) => li.addEventListener('click', cartItemClickListener));
};

const loadLocalStorage = () => {
  const loadCart = getSavedCartItems();
  cartItems.innerHTML = loadCart;
  reenableLoadedItems();
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

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendCartItem = async (sku) => {
  const item = await fetchItem(sku);
  cartItems.appendChild(createCartItemElement(item));
  saveCartItems(cartItems.innerHTML);
  itemsTotal();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.addEventListener('click', () => appendCartItem(sku));

  return section;
}
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// como queria um código mais dinâmico, deixei um parametro default como computador, 
// mas ainda com a possibilidade de chamar a função com outro parametro; 
const displayProducts = (SearchedProduct = 'computador') => {
  const resultsParent = document.querySelector('.items');
  fetchProducts(SearchedProduct).then((products) => {
    products.results.forEach((product) => {
      const displayProduct = createProductItemElement(product);
      resultsParent.appendChild(displayProduct);
    });
  });
};

const appendTotal = () => {
  const newTotal = document.createElement('section');
  cart.appendChild(newTotal);
  newTotal.className = 'total-price';
};

emptybutton.addEventListener('click', () => {
  cartItems.innerHTML = '';
  itemsTotal();
  saveCartItems(JSON.stringify(''));
});

const loadProducts = async () => {
  appendLoading();
  setTimeout(() => fadeLoading(), 2000);
  setTimeout(() => displayProducts(), 2001);
};

window.onload = () => { 
  // displayProducts() => agora tera que ter mensagem de loading;
  loadProducts();
  loadLocalStorage();
  appendTotal();
  itemsTotal();
};
