const listCarrinho = document.querySelector('.cart__items');

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

// função que recebe id, nome, imagem e cria uma section para mostrar eles na tela
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// remove o item do carrinho de compras caso ele seja clickado
function cartItemClickListener(event) { 
  listCarrinho.removeChild(event.target);
}

// cria o item para o carrinho de compras
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Identifica o ID do item pedido, separa os valores necessarios para a funcao createCartItemElement e adiciona o item ao carrinho
async function addToCarrinho(event) {
  const sectionID = event.target.parentNode.firstElementChild.innerText;
  const dadosID = await fetchItem(sectionID);
  const dadosObj = {
    sku: dadosID.id, 
    name: dadosID.title, 
    salePrice: dadosID.price,
  };
  const newCarrinho = createCartItemElement(dadosObj);
  listCarrinho.appendChild(newCarrinho);
}

// faz com que os botoes "adicionar ao carrinho" funcionem e redireciona seu funcionamento para a funcao addToCarrinho
function creatButton(sectionClass) {
  const button = sectionClass.lastChild.lastChild;
  button.addEventListener('click', addToCarrinho);
}

// separa cada item entregue pela API e faz com que ele apareca na tela atravez da funcao createProductItemElement
async function SearchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionClass = document.querySelector('.items');
  searchData.results.forEach((acc) => {
    const accObject = {
      sku: acc.id,
      name: acc.title,
      image: acc.thumbnail,
    };
    const newItem = createProductItemElement(accObject);
    sectionClass.appendChild(newItem);
    creatButton(sectionClass);
  });
}

// habilita botao para limpar a lista de compra
function clearButton() {
  const clean = document.querySelector('.empty-cart');
  clean.addEventListener('click', () => {
   listCarrinho.innerText = ' ';
  });
}

// faz com que a pagina seja carregada com a lista de computadores disponiveis na API
window.onload = () => {
  SearchProducts('computador');
  clearButton();
};
