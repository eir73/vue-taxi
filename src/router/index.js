import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'login' },
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUserLogged = store.getters.isUserLogged
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !isUserLogged) {
    next('/login')
  } else {
    next() 
  }
})

export default router
