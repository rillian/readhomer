import Vue from 'vue';
import App from './App.vue';
import store from './store';

import SkeletonPlugin from './skeleton/plugin';
import widgets from './widgets';

Vue.config.productionTip = false;

const files = require.context('./global-components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
  .forEach(file => Vue.component(file));

Vue.use(SkeletonPlugin, { widgets });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
