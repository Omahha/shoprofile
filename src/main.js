import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Vuelidate)

// axios.defaults.baseURL = 'http://shoprofileapi.test:1443/api'
axios.defaults.baseURL = 'https://sho-profile-api.herokuapp.com/api'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
