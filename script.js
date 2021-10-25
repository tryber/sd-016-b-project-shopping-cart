const tagOl = document.querySelector('.cart__items');
const sectionCarShopping = document.querySelector('.cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// ******************************** 
// Função Soma Produtos do Cart //
// ******************************
function sumPriceTotalProducts() {
  const localPrice = document.querySelector('.total-price');
  const localTexto = document.querySelector('.texto-indicativo');
  
  let sum = 0;
  const tagsLis = document.getElementsByClassName('cart__item');
  for (let i = 0; i < tagsLis.length; i += 1) {
    sum += Number(tagsLis[i].innerHTML.split('$').pop());
  }
  localTexto.innerText = 'Valor Total';
  localPrice.innerHTML = sum;
}
// ***********************
// QUESTÃO 03 FRONT END *
// **********************
function cartItemClickListener(event) {
   const objecto = event.target;
   objecto.remove();
   sumPriceTotalProducts();
   saveCartItems(tagOl.innerHTML);
  }

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// ********************* 
// QUESTÃO 06 FRONT //  
// *******************
const buttonClearShopping = document.querySelector('.empty-cart');
buttonClearShopping.addEventListener('click', () => {
  tagOl.innerHTML = '';
  saveCartItems(tagOl.innerHTML);
  // https://qastack.com.br/programming/7667958/clearing-localstorage-in-javascript
  localStorage.clear();
  sumPriceTotalProducts();
});

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// *****************************************************
// COMETÁRIO DA FUNÇÃO: Não irei Utilizar essa função //
// ********************* ******************************
function getSkuFromProductItem(item) {  
   // coloque código aqui
}

// ************************************
// CRIANDO A FUNÇÃO LOAD CARREGANDO 
// ************************************
function loadBar() {
  const pLoad = document.createElement('p');
  pLoad.className = 'loading';
  pLoad.innerText = 'carregando...';
  pLoad.style.background = 'yellow';
  sectionCarShopping.appendChild(pLoad);
}
// ************************************
// CRIANDO A FUNÇÃO REMOVE LOAD BAR 
// ************************************
function removeLoadBar() {
  document.querySelector('.loading').remove();
}
 // ***************************************************** 
// CRIANDO A FUNÇÃO DE CUSTOMIZAÇÃO DE PREÇO TOTAL 
// ******************************************************
// Função cria os elementos que estarão contidos na section
// Preço Total
function createCustomPriceTotal(element, innerText, idElement) {
  const e = document.createElement(element);
  e.innerText = innerText;
  e.id = idElement;
  return e;
}

// ************************************************************
// Função que irá criar e acoplar o elemento a seção no HTML /
// **********************************************************
function createSectionPrice() {
  const sectionPriceTotal = document.createElement('section');
  const spanTexto = document.createElement('span');
  const spanValue = document.createElement('span');
  
  sectionPriceTotal.className = 'container-main';
  spanTexto.className = 'texto-indicativo';
  spanValue.className = 'total-price';
  
  sectionPriceTotal.appendChild(spanTexto);
  sectionPriceTotal.appendChild(spanValue);
  sectionCarShopping.appendChild(sectionPriceTotal);
}

// **********************
// QUESTÃO 02 BACK END //
// **********************
async function addShoppingCartBackEnd(event) {
    try {
      const idProduto = event.target.parentNode.firstChild.innerText;
      loadBar();
      const dataResult = await fetchItem(idProduto);
      removeLoadBar();
      const { id: sku, title: name, price: salePrice } = dataResult;
      const elementChild = createCartItemElement({ sku, name, salePrice });
      const itens = document.querySelector('.cart__items');
      itens.appendChild(elementChild);
      saveCartItems(itens.innerHTML);
      sumPriceTotalProducts();
      const tagHr = document.createElement('hr');
      itens.appendChild(tagHr);
   } catch (error) {
    console.log('Erro Function addShoppingCarBackEnd:', error);
    removeLoadBar();
  }
}

// **********************
// FRONT END //
// **********************
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdicionar = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdicionar.addEventListener('click', addShoppingCartBackEnd);
  section.appendChild(buttonAdicionar);

  return section;
}

// **********************
// QUESTÃO 01 BACK END //
// **********************
async function backEndCreateProductItem() {
  try {
    loadBar();
   const { results } = await fetchProducts('computador');
   removeLoadBar();
    results.forEach((item, position) => {
    const { id: sku, title: name, thumbnail: image } = results[position];
    const elementChild = createProductItemElement({ sku, name, image });
    const itens = document.querySelector('.items');
    itens.appendChild(elementChild);
  });
 } catch (error) {
   console.log('Seu erro é:', error);
   removeLoadBar();
 }
}

// ******************************************* //
// FRONT END Busncando LocalSotorage          //
// setando na tagHtml e colocando de remoção //
// *******************************************
function load() {
  const recuperaLocalStorage = getSavedCartItems();
  tagOl.innerHTML = recuperaLocalStorage;
  tagOl.addEventListener('click', cartItemClickListener);
  }

window.onload = () => {
  backEndCreateProductItem();
  load();
  createSectionPrice();
  sumPriceTotalProducts();
  };
