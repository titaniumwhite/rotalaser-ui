import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';
import VueSessionStorage from "vue-sessionstorage";

Vue.use(VueSessionStorage);
Vue.component('zingchart', zingchartVue)

Vue.config.productionTip = false
Vue.prototype.$key = {value: "black"};
Vue.prototype.$sium = "???"


new Vue({
  data:{
    key: ""
  },
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

