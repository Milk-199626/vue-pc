import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import "./mock/mockServer";

import "./styles/reset.css";
import "./plugins/element.js";
import "./styles/iconfont.css";
import "swiper/swiper-bundle.min.css";

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
