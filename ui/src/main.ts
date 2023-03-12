import Vue from "vue"
import VueMask from "v-mask"
import Vuelidate from "vuelidate"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"

import router from "./router"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount("#app")
