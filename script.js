// Variáveis globais.
const elementItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const clearItems = document.querySelector('.empty-cart');
const load = document.querySelector('.loading');
const totalCart = document.querySelector('.total-price');
let total = 0;

// Função para limpar o carrinho.
function clearCart() {
  cartItems.innerHTML = '';
  totalCart.innerHTML = '0';
  saveCartItems(cartItems.innerHTML);
}
clearItems.addEventListener('click', clearCart);

// Função para criar a imagem do produto.
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função para adicionar o evento de click que remove o item do carrinho.
// Subtrai o preço do item do valor total.
function cartItemClickListener(event) {
  total -= event.target.innerText.split('$')[1];
  totalCart.innerText = total;
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
}

// Função para criar os itens no html.
function createCartItemElement({
  id: sku,
  title: name,
  price: salePrice,
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

// Função para somar os preços.
const sumTotalPrice = (price) => {
  total += price;
  totalCart.innerText = total;
};

// Função para buscar o ID dos item clicando no botão adicionar carrinho.
// Salva os itens no localStorage.
// Cria o item no carrinho.
// Soma o preço do item no valor total.
async function getSkuFromProductItem(item) {
  const itemID = item
    .target
    .parentNode
    .querySelector('span.item__sku')
    .innerText;
  await fetchItem(itemID)
    .then((element) => {
      cartItems
        .appendChild(createCartItemElement(element));
      saveCartItems(cartItems.innerHTML);
      sumTotalPrice(element.price);
    });
}

// Cria o elemento no html para o produto.
// Adiciona evento de click 
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', getSkuFromProductItem);
  }
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Cria  o produto no elemento do html.
function createProductItemElement({
  id: sku,
  title: name,
  thumbnail: image,
}) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// Remove a descrição de loading após o carregamento dos itens.
const removeLoadingResponse = () => load.remove();

// Acessa a API, trata a resposta e adiciona os itens na tela.
const solveResponse = () => {
  fetchProducts('computador')
    .then((response) => {
      response.results
        .forEach((element) => {
          elementItems
            .appendChild(createProductItemElement(element));
        });
      removeLoadingResponse();
    });
};

// Recupera o status do carrinho no local storage.
// Adiciona o evento de click novamente aos itens do carrinho.
const addEventClick = () => {
  cartItems.innerHTML = getSavedCartItems();
  const itemsShopping = document.querySelectorAll('.cart__items');
  itemsShopping.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  solveResponse();
  addEventClick();
};