const seItens = document.querySelector('.items');
const seCarrinho = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  seCarrinho.removeChild(event.target);
}

const somarValores = () => {
  console.log('aaa');
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addCarrinho = (event) => {
  const idDoproduto = event.target.parentElement.firstElementChild.innerText;
  fetchItem(idDoproduto).then((data) => { 
    seCarrinho.appendChild(createCartItemElement({
      sku: data.id, 
      name: data.title, 
      salePrice: data.price,
    }));
    somarValores(data.price, '+');
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

const criarItens = (data) => data
  .forEach((element) => {
    seItens.appendChild(createProductItemElement({
      sku: element.id, 
      name: element.title, 
      image: element.thumbnail, 
    }));
  });

fetchProducts('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((data) => criarItens(data.results));

window.onload = () => { };
