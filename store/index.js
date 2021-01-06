const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        // 如果请求头中有个Cookie
        if (req.headers.cookie) {
          // 使用Cookieparser把cookie字符串转化为JavaScript对象
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}