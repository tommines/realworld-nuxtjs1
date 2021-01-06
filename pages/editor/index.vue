<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ message }}
            </li>
          </template>
         </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">  
                  <input  v-model="article.title"  class="form-control form-control-lg ng-valid ng-touched ng-dirty ng-valid-parse ng-empty"  type="text" placeholder="Article Title" required>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?" required>
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input  type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button @click="submitArticle"  class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'
export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return { 
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      errors: {} // 错误信息
    }
  },
  async mounted () {
     const slug = this.$route.params.slug
     if (slug) {
      this.slug = slug
      const { data } = await getArticle(slug)
      this.article = data.article
     }
  },
   methods: {
    async submitArticle () {
      try {
        if (this.slug) {
          const { data } = await updateArticle(this.slug, {article: this.article})
          this.$router.push(`/article/${data.article.slug}`)
        }else {
          const { data } = await createArticle({
            article: this.article
          })
          this.$router.push(`/article/${data.article.slug}`)
        }
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
 }
}
</script>

<style>

</style>
