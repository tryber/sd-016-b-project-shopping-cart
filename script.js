const listaCarrinho = document.querySelector('.cart__items');

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

// desabilitei por causa do lint ------------------------------------------------------
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // consultei o site: https://pt.stackoverflow.com/questions/316367/como-remover-div-especifica-com-javascript
  event.target.remove();

  saveCartItems(listaCarrinho.innerHTML); // requisito 4
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// requisito 2
function evento(event) {
  const pai = event.target.parentNode;
  const id = pai.firstChild.innerText;
  
  fetchItem(id).then((dados) => {
    const sku = dados.id;
    const name = dados.title;
    const salePrice = dados.price;

    listaCarrinho.appendChild(createCartItemElement({ sku, name, salePrice }));

    saveCartItems(listaCarrinho.innerHTML); // requisito 4
  });
}

// requisito 1
fetchProducts('computador').then((dados) => {
  const dado = dados.results;

  for (let index = 0; index < dado.length; index += 1) {
    const sku = dado[index].id;
    const name = dado[index].title;
    const image = dado[index].thumbnail;

    const add = document.querySelector('.items');
    add.appendChild(createProductItemElement({ sku, name, image }));
  }
  // adicionando escuta para o botão para o requisito 2
  const botoes = document.getElementsByClassName('item__add');
  for (let index = 0; index < botoes.length; index += 1) {
    botoes[index].addEventListener('click', evento);
  }
});

// requisito 6
const limpar = document.querySelector('.empty-cart');
function esvaziar() {
  const apagarLista = document.querySelector('.cart__items');
  apagarLista.innerHTML = '';
  saveCartItems(listaCarrinho.innerHTML); // requisito 4
}
limpar.addEventListener('click', esvaziar);

// requisito 4
function escutaApagarItens() {
  const itens = document.getElementsByClassName('cart__item');
  for (let index = 0; index < itens.length; index += 1) {
    itens[index].addEventListener('click', cartItemClickListener);
  }
}

window.onload = () => {
  getSavedCartItems(escutaApagarItens);
};
