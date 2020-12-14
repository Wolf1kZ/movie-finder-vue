import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueYoutube from 'vue-youtube';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueYoutube);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
