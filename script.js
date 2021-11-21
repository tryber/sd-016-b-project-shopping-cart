const cartItems = document.querySelector('.cart__items');

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

// Requisito 03 - Remover item do carrinho ao clicar // Req. 04 Salvar no localStore a mudança
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
 
// Requisito 01 -  Crie uma listagem de produtos
const getProduct = async (item) => {
  const productsInfos = await fetchProducts(item);
  const sectionItems = document.querySelector('.items');
   productsInfos.results.forEach((element) => {
     const result = {
       sku: element.id,
       name: element.title,
       image: element.thumbnail,
     };
     const resultado = createProductItemElement(result);    
     sectionItems.appendChild(resultado);
   });
 };

// Requisito 02 - Adicione o produto ao carrinho de compras
const addProductToCart = async (item) => {
  const cartItem = document.querySelector('.cart__items');
  const fItem = await fetchItem(item);

  const objItem = {
    sku: fItem.id,
    name: fItem.title,
    salePrice: fItem.price,
  };

  const createItem = createCartItemElement(objItem);
  cartItem.appendChild(createItem);
  
  saveCartItems(cartItems.innerHTML);
};

// Requisito 04 - getLocalStore
const local = () => {
  const getSaved = getSavedCartItems();
  cartItems.innerHTML = getSaved;
};

// Adiciona eventos. (adicionar/remover itens do carrinho)
const eventListeners = () => {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      const itemId = e.target.parentNode.firstChild.innerText;
      addProductToCart(itemId);
    }
    if (e.target && e.target.classList.contains('cart__item')) {
      cartItemClickListener(e);
    }
  });
};

// Requisito 06 - Limpa Carrinho
const clearCart = () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
};
const btnClear = document.querySelector('.empty-cart');
btnClear.addEventListener('click', clearCart);

// Requisito 07 - Funções Carrengando
const loadingON = () => {
  const load = createCustomElement('p', 'loading', 'Carregando...');
  cartItems.appendChild(load);
};
const loadingOFF = () => {
  document.querySelector('.loading').remove();
};

// Requisito 07 - Carregando página
const loadingPage = async () => {
  loadingON();
  await getProduct('computador')
    .then(() => eventListeners())
    .then(() => local())
    .then(() => loadingOFF());
};
 
window.onload = () => { 
  loadingPage();
  // getProduct('computador');
  // eventListeners();
  // local();
};
