import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Work from '../views/Work.vue'
import Textile from '../views/Textile.vue'
import Graphic from '../views/Graphic.vue'
import Illustration from '../views/Illustration.vue'
import Contact from '../views/Contact.vue'
import Biography from '../views/Biography.vue'

import Admin from '../views/Admin/Home.vue'
import Edit from '../views/Admin/Edit.vue'

Vue.use(VueRouter)

const routes = [
  /* eslint-disable func-call-spacing */
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/work',
    name: 'Work',
    component: Work
  },
  {
    path: '/textile',
    name: 'Textile',
    component: Textile
  },
  {
    path: '/graphic',
    name: 'Graphic',
    component: Graphic
  },
  {
    path: '/illustration',
    name: 'Illustration',
    component: Illustration
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/biography',
    name: 'Biography',
    component: Biography
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        store.dispatch ('tryAutoLogin').then (() => {
          if (store.state.idToken) {
            next()
          } else {
            next('/admin')
          }
        })
      }
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
