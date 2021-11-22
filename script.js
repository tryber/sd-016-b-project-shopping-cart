const productList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

/** 
 * Armazenamento de todas as funcionalidades principais do Storage Local;
 */
const storage = {
    strings: { total: 'cart__total-price', cart_items: 'cartItems' },
};
 
/** Atualiza o banco de dados local; */
const updateLocalStorage = (item, value) => {
    switch (item) {
      case 'total':
        localStorage.setItem(storage.strings.total, value);
        break;
      case 'cart':
        localStorage.setItem(storage.strings.cart_items, value);
        break;
      default:
        return 0;
    }
  };

/** Desenvolve e retorna um elemento IMG para o produto; */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/** Desenvolve e retorna um elemento customizado para o produto; */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/** Desenvolve todo o produto estruturado; */
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/** Captura o ID do produto; */
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

/** Evento disparado quando clickado em algum item do carrinho de compras; */
const cartItemClickListener = ({ target }) => {
    cartList.removeChild(target); // Remove o elemento alvo do carrinho de compras;
    const string = target.innerHTML; // Captura toda a string do produto alvo no carrinho de compras;
    const price = Number(string.substring(string.indexOf('$') + 1)); // Captura a string partindo do index do char $ + 1; Captura apenas o valor do produto;
    totalPrice.innerHTML = (Number(totalPrice.innerHTML) - price);
    updateLocalStorage('total', Number(totalPrice.innerHTML));
    saveCartItems(cartList.innerHTML);
};

/** Carrega o banco de dados local; */
const loadLocalStorage = () => {
    if (localStorage.getItem('cartItems')) {
      cartList.innerHTML = getSavedCartItems();
      if (localStorage.getItem(storage.strings.total) < 0) {
        updateLocalStorage('total', 0);
      }
      totalPrice.innerHTML = localStorage.getItem(storage.strings.total);
      document.querySelectorAll('.cart__items li')
        .forEach((item) => item.addEventListener('click', cartItemClickListener));
    }
};

/** Desenvolve e retorna o item para o carrinho de compras; */
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

/** Desenvolve a lista de produtos; */
const assemblyListProducts = async (query) => {
    const { results } = await fetchProducts(query);
    results.forEach(({ id, title, thumbnail }) => {
        const object = { sku: id, name: title, image: thumbnail };
        productList.appendChild(createProductItemElement(object));
    });
};

/** Adiciona o produto no carrinho de compras; */
const addInShoppingCart = async ({ target }) => {
    const elementId = getSkuFromProductItem(target.parentNode);
    const { id, title, price } = await fetchItem(elementId);
    cartList.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
    totalPrice.innerHTML = (Number(totalPrice.innerHTML) + price);
    updateLocalStorage('total', Number(totalPrice.innerHTML));
    saveCartItems(cartList.innerHTML);
};

/** Apaga todos os items do carrinho de compras; */
const clearShoppingCart = () => {
    if (localStorage.getItem('cartItems')) {
        cartList.innerHTML = null;
        totalPrice.innerHTML = '0';
        localStorage.clear();
    }
};

/** Main Thread; */
window.onload = async () => {
    loading.innerHTML = 'carregando'; // Adiciona o texto carregando para o elemento loading;
    await assemblyListProducts('computador'); // Monta a lista de produtos;
    loading.remove(); // Remove o elemento loading do DOM;
    loadLocalStorage(); // Carrega o banco de dados local;

    // Adiciona o evento para incluir itens no carrinho de compras;
    document.querySelectorAll('.item__add').forEach((item) => {
        item.addEventListener('click', (event) => { 
            // Remove a propagação do javascript; Fix future bugs;
            event.stopPropagation(); 
            addInShoppingCart(event);
        });
    });

    // Adiciona o evento para limpar o carrinho de compras
    document.querySelector('.empty-cart')
        .addEventListener('click', clearShoppingCart);
};
