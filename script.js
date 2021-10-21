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
  const capturarClasseItems = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  capturarClasseItems.appendChild(section);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  
  li.className = 'cart__item';
  const classCartItems = document.querySelector('.cart__items');
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  classCartItems.appendChild(li);
}

const criarProduto = async () => {
  const arrayItens = await fetchProducts('computador');
  arrayItens.results.forEach((item) => createProductItemElement(item));
};
criarProduto();

const adicionarCart = () => {
  const capturarBotao = document.querySelector('.items');
  capturarBotao.addEventListener('click', (event) => {
    if (event.target.className !== 'item__add') return; 
    const id = event.target.parentNode.querySelector('.item__sku').innerText;
    fetchItem(id).then((data) => createCartItemElement(data));
  });
};
adicionarCart();

window.onload = () => {};
