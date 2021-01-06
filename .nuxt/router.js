import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4eda7277 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _5d4fdb6c = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _4ce3da7c = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _7c7dfbfc = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _b6fcd7a0 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _430b98ba = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _63483f49 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _4eda7277,
    children: [{
      path: "",
      component: _5d4fdb6c,
      name: "home"
    }, {
      path: "/login",
      component: _4ce3da7c,
      name: "login"
    }, {
      path: "/register",
      component: _4ce3da7c,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _7c7dfbfc,
      name: "profile"
    }, {
      path: "/settings",
      component: _b6fcd7a0,
      name: "settings"
    }, {
      path: "/editor/:slug?",
      component: _430b98ba,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _63483f49,
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
