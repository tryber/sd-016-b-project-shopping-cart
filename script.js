const cartList = document.querySelectorAll('.cart__items');

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

// criando os elementos referente ao carrinho

async function addCartProduct(event) {
  const findId = getSkuFromProductItem(event.target.parentNode);
  const data = await fetchItem(findId);
  const addCartItens = createCartItemElement(data);
  cartList.appendChild(addCartItens);
  saveCartItems(cartList.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');

  const buttons = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(buttons);

  buttons.addEventListener('click', addCartProduct);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// chamando a função que cria os componentes html com as informações do produto

async function findInfoProduct() {
  const classItem = document.querySelector('.items');
  const data = await fetchProducts('computador');
  
  data.results.forEach((result) => {
    const itemObj = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const newItem = createProductItemElement(itemObj);
    classItem.appendChild(newItem);
  });  
}

// função que manipula produtos do carrinho
const eventsCartList = () => {
  cartList.innerHTML = getSavedCartItems();
  const list = document.querySelectorAll('.cart__item');
  list.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

window.onload = () => { 
  findInfoProduct();
  eventsCartList();
};