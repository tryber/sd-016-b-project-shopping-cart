// algumas discutidas em grupo
const getOl = document.querySelector('.cart__items');

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

// // 3. Remova o item do carrinho de compras ao clicar nele
// // Ao clicar no produto no carrinho de compra, ele deve ser removido da lista.

function cartItemClickListener(event) {
  getOl.removeChild(event.target);
  saveCartItems(getOl.innerHTML);
}

// // 4. Carregue o carrinho de compras através do LocalStorage ao iniciar a página
// // Para completar esse requisito, você deve implementar duas funções dentro da pasta helpers: saveCartItems e getSavedCartItems.
// // A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada.
// // Já a função getSavedCartItems deve recuperar os itens do carrinho de compras do localStorage quando carregamos a página. Após ter implementado com sucesso as funções saveCartItems e getSavedCartItems, você deve utilizá-las dentro do arquivo script.js.

const saveCartItemsSelects = () => {
  getOl.innerHTML = getSavedCartItems();
  const getLiLocalStorage = document.querySelectorAll('.cart__item');
  getLiLocalStorage.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// // // 2-Preste atenção que o JSON deve conter apenas um item.
// // // Após ter implementado com sucesso a função fetchItem, você deve utilizá-la dentro do arquivo script.js. Não é necessário importá-la, pois o script fetchProducts.js já está na estrutura do arquivo HTML, basta chamá-la no escopo principal do arquivo. A partir dos dados obtidos pela função fetchItem você deve utilizar a função createCartItemElement() para criar os componentes HTML referentes a um item do carrinho.
// // // Adicione o elemento retornado da função createCartItemElement(product) como filho do elemento <ol class="cart__items">.

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function carItems(event) {
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const allList = await fetchItem(getSku);
  const car = createCartItemElement(allList);
  getOl.appendChild(car);
  saveCartItems(getOl.innerHTML);
}

// 7. Adicione um texto de "carregando" durante uma requisição à API
// Crie um elemento que contenha o texto "carregando...", que deve ser exibido em algum lugar da página;
// Este elemento deve ser mostrado apenas durante a requisição à API;
// Este elemento deve obrigatoriamente ter a classe loading;
const createLoading = () => {
const getSection = document.querySelector('.remove-loading');
getSection.innerHTML = '';
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', carItems);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  createLoading();
    return section;
  }

// // // 1 Após ter implementado com sucesso a função fetchProducts, você deve utilizá-la dentro do arquivo script.js. Não é necessário importá-la, pois o script fetchProducts.js já está na estrutura do arquivo HTML, basta chamá-la no escopo principal do arquivo. A partir dos dados obtidos pela função fetchProducts você deve utilizar a função createProductItemElement(product) para criar os componentes HTML referentes a um produto.
// // // Adicione o elemento retornado da função createProductItemElement(product) como filho do elemento <section class="items">.
// // // Obs: as variáveis sku, no código fornecido, se referem aos campos id retornados pela API
const showItems = async () => {
  const catchFetch = await fetchProducts('computador');
  catchFetch.results.forEach((item) => {
    const catchSection = document.querySelector('.items');
    const createElementItem = createProductItemElement(item);
    catchSection.appendChild(createElementItem);
  });
};

// 6 - utilizada para limpar o carrinho de compras.
const emptyCart = document.querySelector('.empty-cart');
emptyCart.addEventListener('click', () => {
  getOl.innerHTML = '';
});
emptyCart();

window.onload = () => {
  showItems();
  saveCartItemsSelects();
};
