import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import VueSessionStorage from "vue-sessionstorage";
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(VueSessionStorage);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

new Vue({
  data:{
    key: ""
  },
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

