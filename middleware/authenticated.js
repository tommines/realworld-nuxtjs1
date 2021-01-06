export default function ({ store, redirect }) {
    // 如果用户未登录，则跳转到登录页
    if (!store.state.user) {
      return redirect('/login')
    }
  }