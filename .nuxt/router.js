import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c8b0f968 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _cb35c4fe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _9b1249f2 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6d59f472 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _1b647876 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _e04eace2 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _9fc56dd8 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _c8b0f968,
    children: [{
      path: "",
      component: _cb35c4fe,
      name: "home"
    }, {
      path: "/login",
      component: _9b1249f2,
      name: "login"
    }, {
      path: "/register",
      component: _9b1249f2,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6d59f472,
      name: "profile"
    }, {
      path: "/settings",
      component: _1b647876,
      name: "settings"
    }, {
      path: "/editor/:slug?",
      component: _e04eace2,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _9fc56dd8,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
