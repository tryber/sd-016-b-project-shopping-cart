const fetchItem = async (ItemID) => {
  // seu código aqui
  // TODO - Ao clicar no botão deve ser realizada uma requisição. Deverá ser consumido o endpoint: "https://api.mercadolibre.com/items/$ItemID"

  const URL_ITEMID = `https://api.mercadolibre.com/items/${ItemID}`;

  const result = await fetch(URL_ITEMID)
    .then((response) => response.json());

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
