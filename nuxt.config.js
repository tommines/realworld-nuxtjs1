module.exports = {
    loading: '~/components/loading.vue',
    router: {
      linkActiveClass: 'active',
      // 自定义路由表规则
      extendRoutes(routes, resolve) {
        // 清除Nuxt.js基于pages目录生成的路由表规则
        routes.splice(0)
  
        routes.push(...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home')
              },
              {
                path: '/login', // 默认子路由
                name: 'login',
                component: resolve(__dirname, 'pages/login')
              },
              {
                path: '/register', // 默认子路由
                name: 'register',
                component: resolve(__dirname, 'pages/login')
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/')
              }, 
              {
                path: '/editor/:slug?',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ])
      }
    },

    plugins: [
      '~/utils/request.js', 
      '~/utils/dayjs.js',
    ],
    server: {
      host: '0.0.0.0',// 监听所有外网地址。在生产环境服务器上外网环境就能访问到了，在本地的话，局域网都能访问到了
        port: 3000
    }
  }