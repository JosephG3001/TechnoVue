import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'
import Toasted from 'vue-toasted'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/site.scss'
import '@/styles/sh.scss'

Vue.config.productionTip = false
Vue.use(Toasted);
Vue.use(VueMaterial);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
