const seItens = document.querySelector('.items');
const seCarrinho = document.querySelector('.cart__items');
const localCarregando = document.querySelector('#local-loading');
const lTotal = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const somarValores = (valor, operador) => {
  if (operador === '+') {
    lTotal.innerText = parseFloat(Number(lTotal.innerText) + Number(valor));
  } else {
    lTotal.innerText = parseFloat(Number(lTotal.innerText) - Number(valor));
  }
};

const apenasNumeros = (string) => string.substr(9, string.length);

function cartItemClickListener(event) {
  const element = event.target.innerText;
  const valor = apenasNumeros(element.split('|')[2]);
  somarValores(valor, '');
  seCarrinho.removeChild(event.target);
  saveCartItems(seCarrinho.innerHTML);
}

const criarLoading = (load) => { 
  if (load === 'carre') {
    const criarP = document.createElement('p');
    criarP.className = 'loading';
    criarP.innerText = 'carregando...';
    localCarregando.appendChild(criarP);
  } else {
    localCarregando.innerHTML = '';
  }
};

document.querySelector('.empty-cart').addEventListener('click', () => {
  seCarrinho.innerHTML = '';
  saveCartItems(seCarrinho.innerHTML);
});

const addEventNasLI = () => {
  seCarrinho.innerHTML = getSavedCartItems();
  const todasLi = document.querySelectorAll('.cart__item');
  todasLi.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addCarrinho = (event) => {
  criarLoading('carre');
  const idDoproduto = event.target.parentElement.firstElementChild.innerText;
  fetchItem(idDoproduto).then((data) => { 
    seCarrinho.appendChild(createCartItemElement({
      sku: data.id, 
      name: data.title, 
      salePrice: data.price,
    }));
    criarLoading('');
    somarValores(data.price, '+');
    saveCartItems(seCarrinho.innerHTML);
  });
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addCarrinho);
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

const criarItens = (data) => {
  data.forEach((element) => {
    seItens.appendChild(createProductItemElement({
      sku: element.id, 
      name: element.title, 
      image: element.thumbnail, 
    }));
  });
  criarLoading('');
};

fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((data) => criarItens(data.results));

window.onload = () => { addEventNasLI(); };
