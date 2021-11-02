const ol = document.querySelector('.cart__items');
const emptyBotton = document.querySelector('.empty-cart');
// let contador = null;
let totalPrice = 0;
// let object = null;
const subTotal = document.createElement('div');
subTotal.className = 'total-price';
const titleSubTotal = document.createElement('div');
titleSubTotal.className = 'TitleSubTotal';
titleSubTotal.innerText = 'Total:';
document.querySelector('.cart').appendChild(titleSubTotal);
document.querySelector('.cart').appendChild(subTotal);

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

function cartItemClickListener(event) {
  const price = ol.lastChild.lastChild.textContent.split('$')[1];
  console.log(price);
  totalPrice -= price;
  event.target.remove();
  localStorage.clear();
  subTotal.innerHTML = totalPrice;
  localStorage.setItem('subTotal', totalPrice);
  // saveCartItems(ol.innerHTML);
}
function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  object = { SKU: sku, NAME: name, PRICE: salePrice };
  
  // li.innerHTML = `${name} <br> PRICE: $ ${salePrice}`;
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  li.addEventListener('click', cartItemClickListener);

  return li;
}

function addElementCart(result) {
  const salePrice = result.price;
  const titles = result.title;
  const ids = result.id;
  totalPrice += result.price;
  localStorage.setItem('subTotal', totalPrice);
  createCartItemElement(ids, titles, salePrice);
  subTotal.innerHTML = totalPrice;
}

async function getID(event) {
  const ids = event.target.parentNode.firstChild.innerHTML;
  // localStorage.setItem('cartItems', totalPrice);
  addElementCart(await fetchItem(ids));

  return ids; 
}
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const boton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  boton.addEventListener('click', getID);

  section.appendChild(boton);

  return section;
}
async function showData() { 
  const { results } = await fetchProducts('computador');
  for (let index = 0; index < results.length; index += 1) {
    const { id, title, thumbnail } = results[index];

    const items = document.querySelector('.items');
    
    items.appendChild(createProductItemElement({ id, title, thumbnail }));
  }
}
  fetchProducts();
  function emptyCart() {
    ol.innerHTML = '';
    localStorage.clear();
    totalPrice = 0;
    subTotal.innerHTML = totalPrice;  
  }
  emptyBotton.addEventListener('click', emptyCart);

  window.onload = () => {
    showData();
    totalPrice = localStorage.getItem('subTotal');
    totalPrice = parseInt(totalPrice, 10);
    subTotal.innerHTML = totalPrice;
    const lista = getSavedCartItems('cartItems');
    if (lista !== null) {
      const listaObj = lista.split('<li class="cart__item">');
      for (let index = 0; index < listaObj.length - 1; index += 1) {
        console.log(listaObj);
      const li = document.createElement('li'); 
      li.className = 'cart__item';
      ol.appendChild(li);
      li.innerHTML = listaObj[index + 1];
      li.addEventListener('click', cartItemClickListener);
    }
  }
    // saveCartItems(ol.innerHTML);
   };
  //  module.exports = { addElementCart };