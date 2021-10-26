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

async function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} 

async function searchProducts(product) {
  const dataProducts = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  dataProducts.results.forEach((item) => {
    const prodObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const prodItem = createProductItemElement(prodObject);
    sectionItems.appendChild(prodItem);
  });
}

async function addProduct(id) {
  const dataItem = await fetchItem(id);
    const itemObj = {
      sku: `${id}`,
      name: dataItem.title,
      salePrice: dataItem.price,
    }; 
    console.log(itemObj);
    await createCartItemElement({ sku: dataItem.id, name: dataItem.title, salePrice: dataItem.price });
}

window.onload = () => {
  searchProducts('computador');
  addProduct('MLB1615760527');
};
