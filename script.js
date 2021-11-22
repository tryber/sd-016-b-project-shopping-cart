const getOL = document.querySelector('.cart__items');
const itemSection = document.querySelector('.items');
const emptyCartButton = document.querySelector('.empty-cart');
const load = document.querySelector('.loading');

/* Requisito 6 */
const esvaziarCarrinho = () => {
  emptyCartButton.addEventListener('click', () => {
    getOL.innerHTML = '';
    localStorage.clear();
  });
};

/* Função que cria as imagens do card dos produtos */
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
/* Função para criar elementos html de forma dinâmica */
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

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

/* Requisito 3 */
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(getOL.innerHTML);
}

/* Requisito 2 */
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const fetchItemID = async (param) => {
  const data = await fetchItem(param);
  const { id: sku, title: name, price: salePrice } = data;
  const results = createCartItemElement({ id: sku, title: name, price: salePrice });
  getOL.appendChild(results);
};

function eventButton() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const itemID = btn.parentNode.querySelector('.item__sku').textContent;
      await fetchItemID(itemID);
      saveCartItems(getOL.innerHTML);
    });
  });
}

/* Requisito 1 */
const SearchProducts = async () => {
  load.innerText = 'carregando';
  const search = await fetchProducts('computador');
  load.remove();
  search.results.forEach((data) => {
    const result = {
      sku: data.id,
      name: data.title,
      image: data.thumbnail,
    };
    const products = createProductItemElement(result);
    itemSection.appendChild(products);
  });
  eventButton();
};

/* Requisito 4 */
function listenerLocalStorage() {
  getOL.innerHTML = getSavedCartItems();
  const li = document.querySelectorAll('.cart__item');
  li.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

window.onload = () => {
  SearchProducts();
  esvaziarCarrinho();
  listenerLocalStorage();
};
