const olCartItems = document.querySelector('cart__items');

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

// requisito 1

async function getItem(item) {
  const data = await fetchProducts(item);
  const classItens = document.querySelector('.items');

  data.results.forEach((element) => {
   const result = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const search = createProductItemElement(result);
    classItens.appendChild(search);
  });
}

// requisito 2

async function getId(id) {
  const data = await fetchItem(id);
  console.log(data);
}

window.onload = () => {
 console.log(getItem('computador'));
 console.log(getId('MLB1341706310'));
};