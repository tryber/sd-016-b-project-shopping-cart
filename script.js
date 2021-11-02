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

// chamando a função que cria os componentes html comas informações do produto

async function findInfoProduct(product) {
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

// criando os elementos referente ao carrinho

async function CartProduct(product) {
  const classItemCart = document.querySelector('.cart__items');
  const data = await fetchItem(product);
  
  data.results.forEach((result) => {
    const itemCartObj = {
      sku: result.id,
      name: result.title,
      saleprice: result.price,
    };
    const newItemCart = createCartItemElement(itemCartObj);
    classItemCart.appendChild(newItemCart);
  });  
}

window.onload = () => { 
findInfoProduct();
};