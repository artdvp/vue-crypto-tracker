<template>
    <div>
        <h2>Previous price of coins</h2>
        <div id="first">
            <h2>Date : {{ previousCurrency.yesterday.DATE }}</h2>
            <p><label>1 BTC: </label>{{ previousCurrency.yesterday.BTC}} {{ symbol }}</p>
            <p><label>1 ETH: </label>{{ previousCurrency.yesterday.ETH}} {{ symbol }}</p>
            <p><label>1 EVX: </label>{{ previousCurrency.yesterday.EVX}} {{ symbol }}</p>
        </div>
        <div id="second">
            <h2>Date : {{ previousCurrency.twoDays.DATE }}</h2>
            <p><label>1 BTC: </label>{{ previousCurrency.twoDays.BTC}} {{ symbol }}</p>
            <p><label>1 ETH: </label>{{ previousCurrency.twoDays.ETH}} {{ symbol }}</p>
            <p><label>1 EVX: </label>{{ previousCurrency.twoDays.EVX}} {{ symbol }}</p>
        </div>
        <div id="third">
            <h2>Date : {{ previousCurrency.threeDays.DATE }}</h2>
            <p><label>1 BTC: </label>{{ previousCurrency.threeDays.BTC}} {{ symbol }}</p>
            <p><label>1 ETH: </label>{{ previousCurrency.threeDays.ETH}} {{ symbol }}</p>
            <p><label>1 EVX: </label>{{ previousCurrency.threeDays.EVX}} {{ symbol }}</p>
        </div>
         <div id="fourth">
            <h2>Date : {{ previousCurrency.fourDays.DATE }}</h2>
            <p><label>1 BTC: </label>{{ previousCurrency.fourDays.BTC}} {{ symbol }}</p>
            <p><label>1 ETH: </label>{{ previousCurrency.fourDays.ETH}} {{ symbol }}</p>
            <p><label>1 EVX: </label>{{ previousCurrency.fourDays.EVX}} {{ symbol }}</p>
        </div>
         <div id="fifth">
            <h2>Date : {{ previousCurrency.fiveDays.DATE }}</h2>
            <p><label>1 BTC: </label>{{ previousCurrency.fiveDays.BTC}} {{ symbol }}</p>
            <p><label>1 ETH: </label>{{ previousCurrency.fiveDays.ETH}} {{ symbol }}</p>
            <p><label>1 EVX: </label>{{ previousCurrency.fiveDays.EVX}} {{ symbol }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "previous",
  props: {
    previousCurrency: {
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
#first, #second, #third, #fourth, #fifth {
  border: 1px solid #f5ce00;
  padding: 2em 0em;
  max-width: 90%;
  margin: 3px auto;
}
#first p, #second p, #third p, #fourth p, #fifth p {
  display: inline-block;
  padding: 0em 1.5em;
  font-size: 1.5rem;
}

h2 {
    font-size: 1.5em;
    padding-bottom: 1em;
}
</style>
