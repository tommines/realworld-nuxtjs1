export default function ({ store, redirect }) {
    // 如果用户已登录，则跳转到首页
    if (store.state.user) {
      return redirect('/')
    }
  }