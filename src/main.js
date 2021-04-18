import 'element-ui/lib/theme-chalk/index.css';
import locale from './language/element-ui/locale/en.js'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import i18n from './language/lang'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 import VeeValidate from 'vee-validate';
Vue.config.productionTip = false;
import store from './store/store'
import ElementUI from 'element-ui';
import App from './App'
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';
import arabic from './language/vee-validate/locale/ar.js'
import english from './language/vee-validate/locale/en.js'

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
   ar:arabic,
   en:english
  }
});

Vue.use(ElementUI, { locale });
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);
Vue.use(BootstrapVue);


// axios
import axios from './axios.js'
Vue.prototype.$http = axios;
window.server_url = window.location.protocol + "//" + window.location.hostname + ":8000";
window.axios = axios;
let token = localStorage.getItem("token") || null;
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

new Vue({
  el: '#app',
  store,
  i18n,
  router,
  template: '<App/>',
  components: { App },
});


