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

function cartItemClickListener() {
  // this.remove(); Não suportado por IE.
  this.parentNode.removeChild(this);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addLoadingMessage(sectionClassName) {
  const section = document.querySelector(sectionClassName);
  const loadingMessage = createCustomElement('span', 'loading', 'carregando...');

  section.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  const loadingMessage = document.querySelector('.loading');

  loadingMessage.parentElement.removeChild(loadingMessage);
}

async function renderCartItemElement() {
  const cartItemsSection = document.querySelector('.cart__items');

  const itemId = getSkuFromProductItem(this.parentElement);

  addLoadingMessage('.cart');
  const itemData = await fetchItem(itemId);
  removeLoadingMessage();

  const itemObject = {
    sku: itemId,
    name: itemData.title,
    salePrice: itemData.price,
  };

  const cartItem = createCartItemElement(itemObject);
  cartItemsSection.appendChild(cartItem);
}

function addEventListenerToItems() {
  const addItemButtons = document.querySelectorAll('.item__add');
  const addItemButtonsList = Array.from(addItemButtons);
  // Para usar métodos para array, foi necessário converter a NodeList para array.
  // Usei o método Array.from() tendo como referência o artigo encontrado no link abaixo.
  // Ref. link: https://attacomsian.com/blog/javascript-convert-nodelist-to-array#:~:text=In%20modern%20JavaScript%2C%20the%20simplest,an%20array%20const%20divsArr%20%3D%20Array.

  addItemButtonsList.forEach((button) => button.addEventListener('click', renderCartItemElement));
}

// Função desenvolvida com base no vídeo disponibilizado no Slack por Bernardo Salgueiro.
async function renderItems(product) {
  const itemsSection = document.querySelector('.items');

  addLoadingMessage('.items');
  const data = await fetchProducts(product);
  removeLoadingMessage();

  data.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };

    const productItem = createProductItemElement(itemObject);
    itemsSection.appendChild(productItem);
  });

  addEventListenerToItems();
}

function emptyCart() {
  const emptyCartButton = document.querySelector('.empty-cart');
  const cartItems = document.querySelector('.cart__items');

  emptyCartButton.addEventListener('click', () => {
    while (cartItems.firstElementChild) {
      cartItems.removeChild(cartItems.firstElementChild);
    }
  });
}

window.onload = () => {
  renderItems('computador'); 
  emptyCart();
};
