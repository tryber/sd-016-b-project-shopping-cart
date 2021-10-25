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

const itemsCart = document.querySelector('.cart__items');

function cartItemClickListener(event) {
  const eT = event.target;
  eT.remove();
  saveCartItems(itemsCart.innerHTML);
}

// fonte de pesquisa para remover evento: https://cursos.alura.com.br/forum/topico-funcao-remove-no-javascript-37253

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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

// Inicio do meu código
const showProducts = async () => {
  const items = document.querySelector('.items');
  const products = await fetchProducts('computador');
  products.results.forEach((product) => {
    const createItem = createProductItemElement(product);
    items.appendChild(createItem);
  });
};

function itemId(event) {
  const innerTxtId = event.target.parentNode.firstChild.innerText;
  return innerTxtId;
}

const addCartItem = async (sku) => {
  const products = await fetchItem(sku);
  const createProduct = createCartItemElement(products);
  document.getElementsByClassName('cart__items')[0].appendChild(createProduct);
  saveCartItems(itemsCart.innerHTML);
};

window.onload = () => {
  showProducts();
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('item__add')) {
      addCartItem(itemId(event));
    }
  });

  // dinamismo nos eventos, não consegui colocar dentro de uma constante que conseguisse funcionar. Então deixei todo o caminho no window. https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
 };
