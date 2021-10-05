import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'

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

