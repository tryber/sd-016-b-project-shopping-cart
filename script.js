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

const price = (str) => {
  const precoTexto = str.slice(-10);
  const valorTexto = precoTexto.replace(/[^0-9.]/g, '');
  const converterTexto = Number(valorTexto);
  return converterTexto;
};

const somarItens = () => {  
  const itens = [...document.querySelectorAll('.cart__item')];
  const map = itens.map((item) => price(item.innerText));
  const somarPrecos = map.reduce((acum, next) => acum + next);
  return somarPrecos;
};

const adicionarTotal = () => {
  document.querySelector('.total-price').innerText = somarItens();
};

function cartItemClickListener(event) {
  event.target.remove();
  adicionarTotal();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');  
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const buscarProduto = async (produto) => {
  const arrayItens = await fetchProducts(produto);
  const sessao = document.querySelector('.items');
  arrayItens.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObj);
    sessao.appendChild(productItem);
  });
};

function capturarId(e) {
  const inner = e.target.parentNode.firstChild.innerText;
  return inner;
}

const allItemsInCart = document.querySelector('.cart__items');
const capturarSessaoCart = document.querySelector('.cart');

const adicionarItemCarrinho = async (id) => {
  const produto = await fetchItem(id);
  const obj = { sku: produto.id, name: produto.title, salePrice: produto.price };
  const adicionarProduto = createCartItemElement(obj);
  document.getElementsByClassName('cart__items')[0].appendChild(adicionarProduto);
  adicionarTotal();
  saveCartItems(allItemsInCart.innerHTML);
};

// function loadItemsInCart() {
//   const htmlCart = getSavedCartItems();  
//   allItemsInCart.innerHTML = htmlCart;
// }

window.onload = () => { 
  buscarProduto('computador');
  capturarSessaoCart.appendChild(createCustomElement('div', 'total-price', ''));
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      adicionarItemCarrinho(capturarId(e));
    }
  });     
};
