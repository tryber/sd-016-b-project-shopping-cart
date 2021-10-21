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

// **********************
// QUESTÃO 01 FRONT END //
// **********************
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
// **********************
// QUESTÃO 01 BACK END //
// **********************
async function backEndCreateProductItem() {
  try {
    const { results } = await fetchProducts('computador');
    results.forEach((item, position) => {
      const { id: sku, title: name, thumbnail: image } = results[position];
      const elementChild = createProductItemElement({ sku, name, image });
      const itens = document.querySelector('.items');
      itens.appendChild(elementChild);
    });
  } catch (error) {
    console.log('Seu erro é:', error);
  }
}

window.onload = () => {
 // backEndCreateProductItem();
 testJestBackEndCreateSemParameter();
};