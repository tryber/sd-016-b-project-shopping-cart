const olCartItems = document.querySelector('.cart__items');
const classItens = document.querySelector('.items');
const clearBtn = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

// requisito 6
function clearList() {
  clearBtn.addEventListener('click', () => {
    olCartItems.innerHTML = '';
    localStorage.clear();
  });
  }
  clearList();

const getLocalStorage = () => {
    const listLocal = JSON.parse(getSavedCartItems());
    listCarts.innerHTML = listLocal;
};

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function setLocalStorage() {
  const list = olCartItems.innerHTML;
  saveCartItems(JSON.stringify(list));
}

function cartItemClickListener(event) {
  const li = event.target;
  event.target.parentNode.removeChild(li);
  localStorage.removeItem(this);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// requisito 2

async function getItemForId(id) {
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = data;
  const result = createCartItemElement({ sku, name, salePrice });
  return result;
}

function addItem() {
  const buttons = classItens.querySelectorAll('.item__add');
  buttons.forEach((element) => {
    element.addEventListener('click', async () => {
    const idProduct = element.parentNode.querySelector('.item__sku').textContent;
    const product = await getItemForId(idProduct);
    olCartItems.appendChild(product);
    setLocalStorage();
    });
  });
}

// requisito 1 feito com a ajuda do Instrutor Bernado Salgueiro

async function getItem(item) {
  loading.innerHTML = 'carregando';
  const data = await fetchProducts(item);
  loading.remove();
  data.results.forEach((element) => {
   const result = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const search = createProductItemElement(result);
    classItens.appendChild(search);
  });
  addItem();
}

// getLocalStorage();

window.onload = () => {
  getItem('computador');
};