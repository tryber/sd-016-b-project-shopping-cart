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

// desabilitei por causa do lint ------------------------------------------------------
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
  console.log(event);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// requisito 2
async function evento(event) {
  const pai = event.target.parentNode;
  const id = pai.firstChild.innerText;
  
  fetchItem(id).then((dados) => {
    const skuId = dados.id;
    const nameItem = dados.title;
    const preco = dados.price;

    const add = document.querySelector('.cart__items');
    add.appendChild(createCartItemElement({ skuId, nameItem, preco }));

    console.log(skuId, nameItem, preco);
  });
}

// requisito 1
fetchProducts('computador').then((dados) => {
  const dado = dados.results;

  for (let index = 0; index < dado.length; index += 1) {
    const sku = dado[index].id;
    const name = dado[index].title;
    const image = dado[index].thumbnail;

    const add = document.querySelector('.items');
    add.appendChild(createProductItemElement({ sku, name, image }));
  }
  // adicionando botão para o requisito 2
  const botoes = document.getElementsByClassName('item__add');
  for (let index = 0; index < botoes.length; index += 1) {
    botoes[index].addEventListener('click', evento);
  }
});

window.onload = () => { };
