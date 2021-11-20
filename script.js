const getOL = document.querySelector('.cart__items');
const itemSection = document.querySelector('.item');


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

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

/* Requisito 2 */
const fetchItemID = async (param) => {
  const data = await fetchItem(param);
  const { sku: id, name: title, salePrice: price } = data;
  const results = createCartItemElement({ id, title, price });
  return results;
};

function addItem() {
  const buttons = classItens.querySelectorAll('.item__add');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const itemID = btn.parentNode.querySelector('.item__sku').textContent;
      const resultID = await fetchItemID(itemID);
      getOL.appendChild(resultID);
      /* saveCartItems(getOL.innerHTML); */
    });
  });
}

/* Requisito 1 */
const SearchProducts = async () => {
  const search = await fetchProducts('computador');
  search.results.forEach((data) => {
    const result = {
      sku: data.id,
      name: data.title,
      image: data.thumbnail,
    };
    const products = createProductItemElement(result);
    console.log(search, products);
    document.getElementsByClassName('item').appendChild(products);
  });
  addItem();
};

window.onload = () => {
  SearchProducts();
};
