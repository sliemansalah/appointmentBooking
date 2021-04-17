import Vue from 'vue'
import './plugins/vuetify'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

Vue.config.productionTip = false;

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
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  i18n,
  components: { App }
});
