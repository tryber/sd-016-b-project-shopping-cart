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

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

// function getId(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function cartItemClickListener(event) {
  event.target.remove();
}

async function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2 : este requisito foi finalmente concluído e corrigido graças ao colega Leandro

async function shoppingList(computerId) {
  const computer = await fetchItem(computerId);
  const { id: sku, title: name, price: salePrice } = computer;
  const elementShoppingCart = await createCartItemElement({ sku, name, salePrice });

  return elementShoppingCart;
}

const computersToBuy = document.querySelector('.items');
computersToBuy.addEventListener('click', async (event) => {
  const computerId = event.target.parentNode.firstChild.innerText;
  const addComputer = await shoppingList(computerId);
  const shoppingCartList = document.querySelector('.cart__items');
  shoppingCartList.appendChild(addComputer);
});

const bringListProducts = async () => {
  await fetchProducts('computador')
  .then((data) => data.results)
  .then((products) => {
    const computersList = document.querySelector('.items');
    products.forEach((product) => {
      const eachComputer = createProductItemElement(product);
      eachComputer.lastChild.addEventListener('click', shoppingList);
      computersList.appendChild(eachComputer);
    });
  });
};

window.onload = async () => { 
  bringListProducts();
};
