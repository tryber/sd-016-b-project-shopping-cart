const itemsSection = document.querySelector('.items');
const cartItemsList = document.querySelector('.cart__items');
const emptyCartBtn = document.querySelector('.empty-cart');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  // Desestruturação apontada pelo colega Israel Sant'Anna em thread do Slack.
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const addLoadingMessage = () => {
  const message = document.createElement('div');
  message.classList.add('loading');
  message.innerText = 'carregando...';
  document.querySelector('body').appendChild(message);
};

const removeLoadingMessage = () => {
  document.querySelector('.loading').remove();
};

const getProducts = () => {
  // Recupera o objeto do produto na API, cria o elemento e o adiciona à section no HTML.
  addLoadingMessage();

  fetchProducts('computador')
    .then(({ results }) => {
      removeLoadingMessage(); // Remove a mensagem de carregamento antes de exibir os produtos.

      for (let i = 0; i < results.length; i += 1) {
        const a = createProductItemElement(results[i]);
        itemsSection.appendChild(a);
      }
    });
};

function getSkuFromProductItem(item) {
  const sku = item.target.parentNode.firstChild;
  return sku.innerText; // Retorna o ID do produto, está correto.
}

function cartItemClickListener(event) {
  // Recupera o elemento HTML e depois o remove usando `.remove()`.
  // https://www.w3schools.com/jsref/met_element_remove.asp
  // https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul
  event.target.remove();
  saveCartItems(cartItemsList.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (id) => {
  // Recupera o objeto do produto específico na API e o adiciona à OL do Cart no HTML.
  const cartItem = document.getElementsByClassName('cart__items')[0];
  const product = await fetchItem(id);
  const addProduct = createCartItemElement(product);
  cartItem.appendChild(addProduct);
  saveCartItems(cartItemsList.innerHTML);
};

const loadCartItems = () => {
  const a = getSavedCartItems();
  cartItemsList.innerHTML = a;
};

loadCartItems();

const emptyCart = () => {
  emptyCartBtn.addEventListener('click', () => {
    cartItemsList.innerHTML = '';
  });
  saveCartItems(cartItemsList.innerHTML);
};

const setupEventListener = () => {
  // 'Seta' o event listener para adicionar um item ao Cart.
  // Não consegui adicionar apenas nos botões, então apliquei para a página toda, mas condicionando os botões.
  document.addEventListener('click', (event) => {
    const item = event.target;
    if (item.classList.contains('item__add')) {
      const id = getSkuFromProductItem(event);
      addToCart(id);
    }
  });
};

window.onload = () => {
  getProducts();
  setupEventListener();
  emptyCart();
  loadCartItems();
};
