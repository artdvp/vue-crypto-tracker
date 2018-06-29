# crypto-tracker

> Vue.js Project PWA

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Crytocurrency Tracker

from : [source](https://medium.com/js-dojo/build-a-cryptocurrency-tracker-using-vue-js-f9b3642823f8)

solve :

- [update interval in vue](https://forum.vuejs.org/t/updating-text-with-setinterval-not-working/29820/4)
- [how to use setInterval in vue component](https://stackoverflow.com/questions/43335477/how-to-use-setinterval-in-vue-component)

transition

- [How do I add CSS animations when updating a value with vue.js?](https://stackoverflow.com/questions/42537359/how-do-i-add-css-animations-when-updating-a-value-with-vue-js)
- https://codepen.io/CSWApps/pen/mAazbX

### First Step

have account [pusher](https://www.pusher.com/)

```
$ vue init pwa crypto-tracker
```

```
? Project name crypto-tracker
? Project description Vue.js Project
? Author Artdvp
? Vue Build standalone
? Install vue-router? No
? Use EsLint to lint your code? No
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with NightWatch? No
```

install axios and moment.js

```bash
$ npm install --save vue-axios axios vue-momentjs moment
```

```bash
$ npm install --save express axios body-parser pusher
```

set config pusher

config.live.js

```js
module.exports = {
  appId: "PUSHER_APP_ID",
  key: "PUSHER_APP_KEY",
  secret: "PUSHER_APP_SECRET",
  cluster: "PUSHER_APP_CLUSTER",
  encrypted: true
};
```

install pusher-js

```bash
$ npm install --save pusher-js
```

```bash
$ npm i serve -g
```
