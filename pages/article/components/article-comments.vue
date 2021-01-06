<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="addComment">
        Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" >
          <i class="ion-trash-a" @click.prevent="delComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { addComment, getComments, delComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 文章列表
      body: ''
    }
  }, 
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async addComment () {
      const { data } = await addComment(this.article.slug, this.body)
      this.comments.unshift(data.comment)
      this.body = ''
    },
    async delComment (id) {
        console.log(id)
        console.log(this.article.slug)
       await delComment(this.article.slug, id)
       console.log( this.comments)
   
        this.comments.splice(0, 1);
    }
  }
}
</script>

<style>

</style>
