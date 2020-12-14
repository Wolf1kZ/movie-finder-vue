import Vue from 'vue'
import Router from 'vue-router'
import Films from './components/Films'
import Film from './components/Film'
import NotFound from './components/NotFound'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      { name:'Start', path:'/', component: null},
      { name:'Film', path:'/film/:id', component: Film},
      { name:'Films', path:'/films/:name', component: Films},
      { name:'Top', path:'/:name', component: Films},
      { path:'*', component: NotFound}
      ],
})