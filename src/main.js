import Vue from 'vue'
import './plugins/vuetify'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);

import arabic from './language/vee-validate/locale/ar.js'
import english from './language/vee-validate/locale/en.js'
import VeeValidate from 'vee-validate';
import i18n from './language/lang'

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
   ar:arabic,
   en:english
  }
});

import 'element-ui/lib/theme-chalk/index.css';
import localeAr from './language/element-ui/locale/ar.js'
import ElementUI from 'element-ui';
Vue.use(ElementUI, { localeAr });

import store from './store/store'
import Vuesax from 'vuesax'
Vue.use(Vuesax, {});


// axios
import axios from './axios.js'
Vue.prototype.$http = axios;
window.server_url = window.location.protocol + "//" + window.location.hostname + ":8000";
window.axios = axios;

let token = localStorage.getItem("token") || null;
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
/* **************************************************************** */
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  i18n,
  store,
  components: { App }
});
