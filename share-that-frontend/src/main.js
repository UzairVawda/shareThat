import Vue from 'vue'

import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './scss/index.scss'

extend('required', {
  ...required,
  message: 'This field is required'
})

Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
