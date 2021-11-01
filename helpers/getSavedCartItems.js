function cartItemClickListener(event) {
  // coloque seu código aqui
  const uiui = JSON.parse(localStorage.getItem('cartItems'));
  const lepoLepo = [];
  let bool = false;
  for (let i = 0; i < uiui.length; i += 1) {
    if (uiui[i].includes(event.target.innerText.slice(0, 19)) && bool === false) { 
      bool = true;
    } else {
      lepoLepo.push(uiui[i]);
    }  
  }
  localStorage.cartItems = JSON.stringify(lepoLepo);
  event.target.remove();
}

const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.length !== 0) {
    const ol = document.querySelector('.cart__items');
    const huehue = JSON.parse(localStorage.cartItems);
    Object.keys(localStorage);
    for (let i = 0; i < huehue.length; i += 1) {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = huehue[i];
      li.addEventListener('click', cartItemClickListener);
      ol.appendChild(li);
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
