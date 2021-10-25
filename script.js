const elementoItems = document.querySelector('.items');
const elementoCart = document.querySelector('.cart__items');
const valorTotal = document.querySelector('.total-price');
const clearCartButton = document.querySelector('.empty-cart');
let valorCart = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  elementoCart.removeChild(event.target);
  const diminuir = parseFloat(event.target.innerText.split('$')[1], 10);
  valorCart -= diminuir;
  valorTotal.innerText = valorCart;
  saveCartItems('carItems', elementoCart.innerHTML);
  // saveCartItems('valor', valorTotal.innerText);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemCart = async (event) => {
  const item = event.target.parentElement.firstChild.innerText;
  await fetchItem(item)
    .then((valor) => { 
      elementoCart.appendChild(createCartItemElement(valor));
      valorCart += valor.price;
      valorTotal.innerText = valorCart;
      // saveCartItems('valor', valorTotal.innerText);
    });
    saveCartItems('carItems', elementoCart.innerHTML);
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') e.addEventListener('click', addItemCart);
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

const getItems = (objeto) => {
  objeto.forEach((element) => {
    elementoItems.appendChild(createProductItemElement({ 
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    }));
  });
};

const funcCarregaPg = () => {
  fetchProducts('computador')
    .then((response) => getItems(response.results));
  elementoCart.innerHTML = getSavedCartItems('carrinho');
  valorTotal.innerHTML = getSavedCartItems('valor');
  const carrinho = document.querySelectorAll('.cart__item');
  carrinho.forEach((elemen) => {
    elemen.addEventListener('click', cartItemClickListener);
  });
};

const clearCart = () => {
  elementoCart.innerHTML = '';
  saveCartItems('carItems', elementoCart.innerHTML);
};

clearCartButton.addEventListener('click', clearCart);

const loadingPage = () => {
  const msg = document.createElement('p');
  msg.innerText = 'carregando';
  msg.classList.add('loading');
  elementoItems.appendChild(msg);
  setTimeout(() => {
    elementoItems.removeChild(msg);
    funcCarregaPg();
  }, 1000);
};
loadingPage();

window.onload = () => {
  // funcCarregaPg();
};
