
var values = {
  clicks: 0,
  score: 0,
  wallet: 0,
  puiss: 1,
  auto_ressource_per_sec: 0,
  puissmult: 0.1,
  puiss_price: 9,
  puissLvl: 1,
};

var buildings = [];
const renderValuesNow = (...elements) => {
  elements.length > 0 ? elements.map(element => {
    values[element] ? $(`#${element}`).text(values[element]) : null;
    $(`#${element}`).text(values[element])
    values[element] && values.wallet >= values[element] ? $(`#${element}_btn`).attr('disabled', false) : null;
  }) : null;
};

let renderQueue = [];
const addToRenderValuesQueue = (...elements) => {
  renderQueue = [...new Set([...renderQueue, ...elements])];
};
setInterval(() => {
  if (renderQueue.length > 0) {
    renderValuesNow(...renderQueue);
    renderQueue = [];
  }
}, 1000);

const incrementWallet = (quantity) => {
  values.wallet = floorDecimal(values.wallet + quantity, 2);
  values.score += quantity;
};

const floorDecimal = (num, decimal) => {
  return Math.floor((num) * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

class Building {
  constructor({ id, base_price, auto_ressource_sec_unit }) {
    this.id = id;
    this.base_price = base_price;
    this.auto_ressource_sec_unit = auto_ressource_sec_unit;
    this.price = base_price;
  }

  listen() {
    $(`#${this.id}_btn`).on('click', () => {
      renderValuesNow('wallet', this.id);
      // addToRenderValuesQueue()
      values[this.id]++;
    });
  };
};

// new Building({ id: 'clicks', base_price: 1, auto_ressource_sec_unit: 1 }).listen();

renderValuesNow(...Object.keys(values));

$('#clicks_btn').on('click', function () {

  values.clicks = values.clicks + 1;
  incrementWallet(values.puiss);

  renderValuesNow('wallet');
  addToRenderValuesQueue('clicks', 'score');

  if (values.wallet >= values.puiss_price) {
    $('#puiss_btn').attr('disabled', false);
  }
});

$('#puiss_btn').on('click', function () {
  if (values.wallet >= values.puiss_price) {
    values.puissLvl++;
    values.wallet -= values.puiss_price;
    values.puiss += values.puissmult;
    values.puiss_price = Math.floor(values.puiss_price * 1.15);

    renderValuesNow('puissLvl', 'puiss_price', 'wallet', 'puiss');
  }

  if (values.wallet < values.puiss_price) {
    $('#puiss_btn').attr('disabled', 'true');
  }
});
