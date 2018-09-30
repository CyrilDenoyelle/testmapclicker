
class App {
  constructor(save) {
    this.base_values = {};
    this.values = {};
    Object.keys(save.base_values).map((key) => {
      this.base_values[key] = save.base_values[key];
      this.values[key] = save.base_values[key];
    })
    this.buildings_stats = save.buildings_stats;
    this.renderValuesQueue = [];
  }

  init() {
    this.helpers().cou();
    this.helpers().renderValuesNow(...Object.keys(this.values));

    this.interval = this.helpers().startIntervalRendering(1000);

    $('#puiss_btn').on('click', this.listeners().puiss_btnListener);
    $('#clicks_btn').on('click', this.listeners().click_btnListener);
  }

  helpers() {
    return {
      cou: () => {
        console.log('coucou');
      },
      renderValuesNow: (...elements) => {
        elements.length > 0 ? elements.map(element => {
          this.values[element] !== undefined ? $(`#${element}`).text(this.helpers().floorDecimal(this.values[element], 3)) : null;

          this.values[element] && this.values.wallet >= this.values[element] ? $(`#${element}_btn`).attr('disabled', false) : null;
        }) : null;
      },
      addToRenderValuesQueue: (...elements) => {
        this.renderValuesQueue = [...new Set([...this.renderValuesQueue, ...elements])];
      },
      startIntervalRendering: (time) => {
        return setInterval(() => {
          if (this.renderValuesQueue.length > 0) {
            this.helpers().renderValuesNow(...this.renderValuesQueue);
            this.renderValuesQueue = [];
          }
        }, time);
      },
      incrementSomthings: (quantity, ...elements) => {

        elements.map(element => {
          this.values[element] = this.helpers().floorDecimal(this.values[element] + quantity, 2);
        })
        console.log(quantity, this.values)
      },
      decrementSomthings: (quantity, ...elements) => {

        elements.map(element => {
          this.values[element] = this.helpers().floorDecimal(this.values[element] - quantity, 2);
        })
        console.log(quantity, this.values)
      },
      floorDecimal: (num, decimal) => {
        return Math.floor((num) * Math.pow(10, decimal)) / Math.pow(10, decimal);
      },
    }
  }

  listeners() {
    return {
      click_btnListener: () => {
        this.values.clicks = this.values.clicks + 1;
        this.helpers().incrementSomthings(this.values.puiss, 'wallet', 'score');

        this.helpers().renderValuesNow('wallet');
        this.helpers().addToRenderValuesQueue('clicks', 'score');

        if (this.values.wallet >= this.values.puiss_price) {
          $('#puiss_btn').attr('disabled', false);
        }
      },
      puiss_btnListener: () => {
        if (this.values.wallet >= this.values.puiss_price) {
          this.values.puissLvl++;
          this.helpers().decrementSomthings(this.values.puiss_price, 'wallet')
          this.helpers().incrementSomthings(this.values.puissmult, 'puiss');

          this.values.puiss_price = Math.floor(this.values.puiss_price * 1.15);

          this.helpers().renderValuesNow('puissLvl', 'puiss_price', 'wallet', 'puiss');
        }
        if (this.values.wallet < this.values.puiss_price) {
          $('#puiss_btn').attr('disabled', 'true');
        }
      }
    }

  }
}

var save = {
  base_values: {
    clicks: 0,
    score: 0,
    wallet: 0,
    puiss: 1,
    auto_ressource_per_sec: 0,
    puissmult: .1,
    puiss_price: 9,
    puissLvl: 1,
  },
  buildings_stats: [],
};

const app = new App(save)
app.init();

