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

function createProductItemElement({ sku, name, image }) { // { sku, name, image } = product (da função fetchProduct)
  const section = document.createElement('section');
  section.className = 'item';
  // sku = id
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

/* 
- Chame a função fetchProducts.js
- A partir dos dados da fetchProducts.js: 
  - crie os elementos HTML na função createProductItemElement(product)

  - Essa questão foi realizada com auxílio do vídeo que o Bê nos disponilizou
    - LINK: https://app.slack.com/client/TMDDFEPFU/CMT2P6CVC/files/F02JERCBK4M
*/
async function searchProducts(product) {
  const search = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  search.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const searchItem = createProductItemElement(itemObject);
    sectionItem.appendChild(searchItem);
  });
}

window.onload = () => {
  searchProducts('computador');
};
