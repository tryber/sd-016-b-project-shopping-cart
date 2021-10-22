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

const getItemsCart = () => {
  const cartList = document.querySelector('.cart__items');
  const cartListItems = cartList.innerHTML;

  saveCartItems(cartListItems);
};

// Fiz da forma abaixo para funcionar também, quando pegar do localstorage que é uma string;
const calcTotalCart = () => {
  const totalPriceCart = document.querySelector('.total-price');
  const cartItem = document.getElementsByClassName('cart__item');

  let total = 0;
  for (let index = 0; index < cartItem.length; index += 1) {
    const elementoItem = cartItem[index].innerText;
    total += parseFloat(elementoItem.substring(elementoItem.indexOf('PRICE: $') + 8));
  }

  totalPriceCart.innerText = `$ ${total.toFixed(2)}`;
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();

  getItemsCart();
  calcTotalCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendByClass = (className, childName) => {
  const father = document.querySelector(`.${className}`);

  return father.appendChild(childName);
};

const getfetchItem = async (id) => {
  const { id: sku, title: name, price: salePrice } = await fetchItem(id);
  const itemElement = createCartItemElement({ sku, name, salePrice });

  return appendByClass('cart__items', itemElement);
};

const itemAdd = (event) => {
    event.lastElementChild.addEventListener('click', (element) => {
      const sku = element.target.parentElement.firstChild.innerText;
      getfetchItem(sku)
        .then(() => {
          getItemsCart();
          calcTotalCart();
        });
    });
};

const getfetchProducts = async () => {
  const { results: products } = await fetchProducts('computador');

  products.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const itemElement = createProductItemElement({ sku, name, image });

    const elementCart = appendByClass('items', itemElement);

    itemAdd(elementCart);
  });
};

const restoreCartList = () => {
  const elementListItem = getSavedCartItems();
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = elementListItem;

  // O código abaixo foi necessário fazer pois, estou usando o innerHTML acima e não criando o item dinamicamente.
  const cartItem = document.getElementsByClassName('cart__item');
  for (let index = 0; index < cartItem.length; index += 1) {
    cartItem[index].addEventListener('click', cartItemClickListener);
  }

  calcTotalCart();
};

/* const calcTotalCart = (price) => {
  const totalPriceCart = document.querySelector('.total-price');
  const total = parseFloat(totalPriceCart.innerText) + price;
  console.log(total);
}; */

window.onload = () => {
  getfetchProducts();
  restoreCartList();
};
