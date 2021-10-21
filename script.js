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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// ajuda de grupo da mentoria do tales pra pegar o valor do botão criado
const carrinhoItem = async (event) => {
  const pegarSku = getSkuFromProductItem(event.target.parentNode);
  const arrayCar = await fetchItem(pegarSku);
  const ol = document.querySelector('.cart__items');
  const carItem = createCartItemElement(arrayCar);
  ol.appendChild(carItem);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', carrinhoItem);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(buttonItem);
  
  return section;
}

const itensCompras = async () => {
  const fetch = await fetchProducts('computador');
  return fetch.results.forEach((item) => {
    const section = document.querySelector('.items');
    const createArr = createProductItemElement(item);
    section.appendChild(createArr);
  });
};

window.onload = () => { 
  itensCompras();
};
