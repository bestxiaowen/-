import Vue from 'vue'
import App from './App.vue'

import myPlugin from './my-plugin'
import myComponents from './component'

Vue.use(myPlugin)
Vue.use(myComponents)
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
