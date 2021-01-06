<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ messages}}
            </li>
          </template>
        </ul>
        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="url" placeholder="URL of profile picture" v-model="user.image" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="handleSubmit">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr/>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie'): undefined
import { update } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  middleware: 'authenticated',
  data () {
    return {
      user: {
        bio: '',
        email: '',
        image: '',
        password: '',
        username: ''
      },
      errors: {} // 错误信息
    }
  },
  computed: {
    ...mapState({updateUser: 'user'})
  },
  
  mounted () {
    this.user.bio = this.updateUser.bio
    this.user.email = this.updateUser.email
    this.user.image = this.updateUser.image
    this.user.password = this.updateUser.password
    this.user.username = this.updateUser.username
  },

  methods: {
    async handleSubmit () {
      try {
        const { data } = await update({
          user: this.user
        })

        console.log('data', data)

        // 更新用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失，数据需要持久化
        Cookie.set('user', data.user)

        this.$router.push(`/profile/${data.user.username}`)
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
    logout () {
      this.$store.commit('setUser', null)
      Cookie.set('user', null)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
