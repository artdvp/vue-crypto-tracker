<template>
    <div>
        <h2>Current prices of coins</h2>
       <div class="just-flex">
            <div id="btc" class="currency">
            <label>1 BTC</label>
            <p>{{ currentCurrency.BTC }} {{ symbol }}</p>
            </div>
            <div id="eth" class="currency">
                <label>1 ETH</label>
                <p>{{ currentCurrency.ETH }} {{ symbol }}</p>
            </div>
            <div id="EVX" class="currency">
                <label>1 EVX</label>
                <p>{{ currentCurrency.EVX }} {{ symbol }}</p>
            </div>
       </div>
    </div>
</template>

<script>
export default {
  name: "current",
  props: {
    currentCurrency: {
      type: Object
    },
    symbol: {
        type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.currency {
    border: 1px solid #F5CE00;
    border-radius: 15px;
    padding: 1em 0em 2em 0em;
    display: inline-block;
    width: 30%;
}
div p {
    font-size: 2rem;
}

h2 {
    font-size: 1.5em;
    padding-bottom: 1em;
    text-transform: uppercase;
}

.just-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
@media (max-width: 690px) {
  .just-flex {
    flex-direction: column;
  }
  .currency {
        width: 100%;
  }
}
</style>
