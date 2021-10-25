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

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    // const { id: sku, title: name, thumbnail: image } = item;
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

async function getItem (id) {
  const dataItem = await fetchItem(item);
  const classItem = document.querySelector('.cart__item')
  const objItem = {
    sku: item.id, 
    name: item.title,  
    salePrice: item.price,
  }
  classItem.appendChild();
}

function clickButton (item) {
  const button = document.querySelector('.item__add');
  const id = item.id;
  button.addEventListener('click',getItem(id))
};

window.onload = () => {
  searchProducts('computador');
  clickButton();
};
