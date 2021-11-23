// Query Selectors

const cartItems = document.querySelector('.cart__items');
const clearButton = document.querySelector('.empty-cart');

// Função de limpar o carrinho

clearButton.addEventListener('click', () => {
cartItems.innerHTML = '';
});

// Função que cria a imagem do produto

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função de criar elementos HTML

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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Função de remover os itens no carrinho clicando neles
// E atualizar a lista do carrinho na localStorage.

function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Parte 1 do Req 2

async function clickCartItem(event) {
  const id = event.target.parentElement.firstChild.innerText;
  const objectId = await fetchItem(id);
  const cartItemsElements = {
    sku: id,
    name: objectId.title,
    salePrice: objectId.price,
  };
  const createElement = createCartItemElement(cartItemsElements);
  cartItems.appendChild(createElement);
  saveCartItems(cartItems.innerHTML);
}

// Req 1

async function searchProducts(product) {
  const items = document.querySelector('.items');
  const searchItems = await fetchProducts(product);
  searchItems.results.forEach((item) => { // Percorre o objeto  retornado de 'fetchProducts'
    const returnObject = { // e retorna um objeto no padrão desejado.
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(returnObject);
    items.appendChild(productItem);
  });
  // Parte 2 do Req 2
  const addToCartButtons = document.querySelectorAll('.item__add');
  addToCartButtons.forEach((button) => { // Adiciona um event listener para cada botão de "adicionar o carrinho".
    button.addEventListener('click', clickCartItem);
});
}

const loadCartItems = () => {
  cartItems.innerHTML = getSavedCartItems();
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

// Função que adiciona o texto 'carregando...' enquanto a requisição não é chamada - Req 7

const loadingFunc = async () => {
  const containerLoading = document.createElement('div');
  containerLoading.className = 'loading';
  containerLoading.innerText = 'carregando...';
  const containerItems = document.querySelector('.items');
  containerItems.appendChild(containerLoading);
  await searchProducts('computador');
  containerItems.removeChild(containerLoading);
};
loadingFunc();

window.onload = () => {
  loadCartItems();
};
