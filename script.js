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
  document . querySelector ( '.cart__items' ).removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

// const id criada durante mentoria do Tales Coelho.
// Resolução de um problema com o results do fetchItem (não precisava do results), com auxilio do Gabriel Pinheiro e Ellen Santos durante a mentoria.
async function getItemId(item) {
  const id = item.target.parentNode.firstChild.innerText;
  const dataItem = await fetchItem(id);
  const objItem = {
    sku: dataItem.id,
    name: dataItem.title,
    salePrice: dataItem.price,
  };
  const cartItem = createCartItemElement(objItem);
  document.querySelector('.cart__items').appendChild(cartItem);
}

// Capturar botões e add escutador em cada um. 
function clickButton() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      getItemId(event);
    });
  });
}

// código desenvolvido a partir do auxilio fornecido pelo Gian Fritsche na mentoria, assim como pelo uso da idéia do código da aula ao vivo disponível na branch sd-016-b-live-lectures.
async function allFunc() {
  await searchProducts('computador')
    .then(() => clickButton());
}

window.onload = () => {
  allFunc();
};
