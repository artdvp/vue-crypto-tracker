<template>
  <div id="app">
    <header class="hero">
        <div class="bar logo">
            <h3>CryptoTracker</h3>
            <span class="monitor">
                <span class="monitorText" @click="_fetchNewData()">receive updates</span>
            </span>
        </div>
        <h1>Realtime PWA that display updates on crytocurrencies</h1>
    </header>
   <div id="body">
      <div id="current">
        <div class="btn-switch">
          <button @click="_switchSymbol('฿')" v-bind:class="{ 'btn-active' : isActiveClass}" class="btn-curr">THB</button>
          <button @click="_switchSymbol('$')" v-bind:class="{ 'btn-active' : !isActiveClass}" class="btn-curr">USD</button>
        </div>
        <current v-bind:currentCurrency="currentCurrency" v-bind:symbol="symbol"></current>
      </div>
      <div id="previous">
        <previous v-bind:previousCurrency="previousCurrency" v-bind:symbol="symbol"></previous>
      </div>
   </div>
   <div class="footer-art">
     Craft by &nbsp;<a href="https://artdvp.github.io" class="text-footer" target="_blank">Artdvp</a>&nbsp; Made with ❤️ &nbsp;<a class="text-footer" href="https://vuejs.org">Vue.js</a>
   </div>
  </div>
</template>

<script>
//import Pusher from "pusher-js";
//import Intro from "./components/Intro.vue";
import Current from "./components/Current.vue";
import Previous from "./components/Previous.vue";

export default {
  name: "app",
  components: {
    //Intro,
    Current,
    Previous
  },
  data() {
    return {
      currentCurrency: { BTC: "", ETH: "", EVX: "" },
      previousCurrency: {
        yesterday: {},
        twoDays: {},
        threeDays: {},
        fourDays: {},
        fiveDays: {}
      },
      timer: "",
      moneyCurr: "THB",
      symbol: "฿",
      isActiveClass: true
    };
  },
  methods: {
    _fetchDataForToday: function() {
      var myCur = this.moneyCurr;

      let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EVX&tsyms=${this.moneyCurr}`;
      this.axios.get(url).then(res => {
        localStorage.setItem(
          "BTC",
          (this.currentCurrency.BTC = res.data.BTC[myCur])
        ),
          localStorage.setItem(
            "ETH",
            (this.currentCurrency.ETH = res.data.ETH[myCur])
          ),
          localStorage.setItem(
            "EVX",
            (this.currentCurrency.EVX = res.data.EVX[myCur])
          );
      });
    },
    _fetchDataFor: function(key, daysAgo) {
      
      let date = this.$moment()
        .subtract(daysAgo, "days")
        .unix();
      let fetch = (curr, date) =>
        this.axios.get(
          `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${curr}&tsyms=${this.moneyCurr}&ts=${date}`
        );
      var myCurr = this.moneyCurr;
      this.axios
        .all([fetch("BTC", date), fetch("ETH", date), fetch("EVX", date)])
        .then(
          
          this.axios.spread((BTC, ETH, EVX) => {
            this.previousCurrency[key] = {
              BTC: BTC.data.BTC[myCurr],
              EVX: EVX.data.EVX[myCurr],
              ETH: ETH.data.ETH[myCurr],
              DATE: this.$moment.unix(date).format("MMMM Do YYYY")
            };

            localStorage.setItem(
              `${key}Prices`,
              JSON.stringify(this.previousCurrency[key])
            );
            //console.log(this.previousCurrency[key]);
          })
        );
    },
    _fetchNewData: function() {
      let self = this;
      //console.log("update");
      //console.log(this.symbol);
      if (!navigator.onLine) {
        self.currentCurrency = {
          BTC: localStorage.getItem("BTC"),
          ETH: localStorage.getItem("ETH"),
          EVX: localStorage.getItem("EVX")
        };

        self.previousCurrency = {
          yesterday: JSON.parse(localStorage.getItem("yesterdayPrices")),
          twoDays: JSON.parse(localStorage.getItem("twoDaysPrices")),
          threeDays: JSON.parse(localStorage.getItem("threeDaysPrices")),
          fourDays: JSON.parse(localStorage.getItem("fourDaysPrices")),
          fiveDays: JSON.parse(localStorage.getItem("fiveDaysPrices"))
        };
      } else {
        self._fetchDataFor("yesterday", 1);
        self._fetchDataFor("twoDays", 2);
        self._fetchDataFor("threeDays", 3);
        self._fetchDataFor("fourDays", 4);
        self._fetchDataFor("fiveDays", 5);
        self._fetchDataForToday();

        // Pusher.logToConsole = true;

        // let pusher = new Pusher("94a8339d225401384224", {
        //   cluster: "ap1",
        //   encrypted: true
        // });

        // let channel = pusher.subscribe("price-updates");
        // channel.bind("coin-updates", function(data) {
        //   this.currentCurrency = {
        //     BTC: data.coin.BTC.THB,
        //     ETH: data.coin.ETH.THB,
        //     EVX: data.coin.EVX.THB
        //   };
        // });
      }
    },
    _switchSymbol: function(val) {
      if (val == "฿") {
        this.symbol = "฿";
        this.moneyCurr = "THB";
        this.isActiveClass = true;
      } else {
        this.symbol = "$";
        this.moneyCurr = "USD";
        this.isActiveClass = false;
      }
      this._fetchNewData();
    }
  },
  created() {
    // update from Interval
    this._fetchNewData();
    //this.timer = setInterval(this._fetchNewData, 10000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato");

* {
  margin: 0px;
  padding: 0px;
  font-family: "Lato", sans-serif;
}
body {
  height: 100vh;
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
h1 {
  font-size: 45px;
}
a {
  color: #ffffff;
  text-decoration: none;
}
a:hover {
  color: #ffffff;
}
a:visited {
  color: #000000;
}
.button {
  margin: auto;
  width: 200px;
  height: 60px;
  border: 2px solid #e36f55;
  box-sizing: border-box;
  border-radius: 30px;
}

#body {
  max-width: 90%;
  margin: 0 auto;
  padding: 1.5em;
  text-align: center;
  color: rgb(25, 53, 123);
}
#current {
  padding: 0em 0em 2em 0em;
}
#previous {
  padding: 2em 0em;
}

header {
  background: linear-gradient(
    to bottom right,
    rgb(133, 168, 232),
    rgb(50, 72, 95)
  );
  padding: 1em;
  margin-bottom: 1em;
  text-align: center;
  height: 300px;
  color: #fff;
}
header h3 {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  float: left;
}
.bar {
  padding: 20px;
  height: 48px;
}
.monitor {
  text-transform: uppercase;
  float: right;
  background-color: rgba(255, 255, 255, 0.2);
  line-height: 23px;
  border-radius: 25px;
  width: 175px;
  height: 48px;
  margin: auto;
}

.monitor:hover,
monitorText:hover {
  cursor: pointer;
}
.monitorText {
  width: 104px;
  height: 23px;
  font-weight: bold;
  line-height: 50px;
  font-size: 14px;
}

header h1 {
  /* padding-top: 80px; */
  width: 80%;
  margin: auto;
}

header h2 {
  padding-top: 20px;
}

.btn-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
}

.btn-curr {
  font-weight: bold;
  color: rgb(25, 53, 123);
  border: 1px solid rgb(25, 53, 123);;
  background-color: #fff;
  margin-right: 5px;
  padding: 5px;
  margin-top: -5px;
  margin-bottom: -5px;
  cursor: pointer;
}

.btn-active {
  color: #fff;
  border: 1px solid #fff;
  background-color: rgb(25, 53, 123);
}

.footer-art {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.text-footer {
  color: #39e965;
}

</style>
