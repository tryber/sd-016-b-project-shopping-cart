const fetchItem = (item) => {
  return fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((resposta) => resposta.json())
};

if (typeof module !== 'undefined');