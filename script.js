const sectionItens = document.querySelector('.items');
const listaCarrinho = document.querySelector('.cart__items');
const botaoLimpador = document.querySelector('.empty-cart');
const carregando = document.querySelector('.loading');
const precoTotal = document.querySelector('.total-price');

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

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  localStorage.removeItem();
  saveCartItems(sectionItens.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  saveCartItems(sectionItens.innerHTML);
  return li;
}

const itemById = async (id) => {
  const dadosItem = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = dadosItem;
  const cartaoDoElemento = createCartItemElement({ sku, name, salePrice });
  precoTotal.innerText = (parseFloat(precoTotal.innerText) + parseFloat(salePrice)).toFixed(2);
  return cartaoDoElemento;
};

function addEventToButton() {
  const botoes = sectionItens.querySelectorAll('.item__add');
  botoes.forEach((botao) => {
    botao.addEventListener('click', async () => {
    const productId = botao.parentNode.querySelector('.item__sku').textContent;
    listaCarrinho.appendChild(await itemById(productId));
    saveCartItems(sectionItens.innerHTML);
    });
  });
}

const catchItem = async (item, callback) => {
  carregando.innerHTML = 'carregando';
  const dadosRecebidos = await fetchProducts(item);
  carregando.parentNode.removeChild(carregando);
  dadosRecebidos.results.forEach((result) => {
   const parametro = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    precoTotal.innerText = '0.00';
    const pesquisa = createProductItemElement(parametro);
    sectionItens.appendChild(pesquisa);
  });
  callback();
};

function limpaTudo() {
  botaoLimpador.addEventListener('click', () => {
    listaCarrinho.innerHTML = '';
    precoTotal.innerText = '0.00';
    localStorage.clear();
  });
}

window.onload = () => {
  catchItem('computador', addEventToButton);
  limpaTudo();
  // itemById('MLB1341706310');
};
