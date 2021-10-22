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

// Item 1
const itemsSection = document.querySelector('.items');
const getProducts = () => {
  // Recupera o objeto do produto na API, cria o elemento e o adiciona à section no HTML.
  fetchProducts('computador')
    .then(({ results }) => {
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

function removeItemFromCartListener(event) {
  // Recupera o elemento HTML e depois o remove usando `.remove()`.
  // https://www.w3schools.com/jsref/met_element_remove.asp
  // https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul
  const a = event.target;
  a.remove();
}

function createCartItemElement({ id: sku, title: name, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  li.addEventListener('click', removeItemFromCartListener);
  return li;
}

const cartItem = document.getElementsByClassName('cart__items')[0];

const addToCart = async (id) => {
  // Recupera o objeto do produto específico na API e o adiciona à OL do Cart no HTML.
  const product = await fetchItem(id);
  const addProduct = createCartItemElement(product);
  cartItem.appendChild(addProduct);
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
};
