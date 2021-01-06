<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
   <span v-if="isLogin" >
    <nuxt-link 
      class="btn btn-sm btn-outline-secondary"
      :to="{
         name: 'editor',
          params: {
            slug: article.slug,
          },
      }"
    >
      <i class="ion-edit"></i>
      Edit Article
    </nuxt-link>
    &nbsp;&nbsp;
    <button
      class="btn btn-outline-danger btn-sm"
      :class="{
        active: article.articleDeleted
      }"
      @click="articleDelete (article)"
      type="button"
    >
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>
   </span>
     <span v-else>
 <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.Followed }"
        @click="onFollow(article.author)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        <span v-if ="article.author.following"> unFollow </span> <span v-else>Follow</span>  {{article.author.username}}
      </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{active: article.favorited}"
             @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter"> ({{ article.favoritesCount }})</span>
    </button>
     </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle, addFavorite, deleteFavorite } from '@/api/article'
import { getProfiles, addFollow, deleteFollow } from '@/api/profile'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
     isLogin () {
      return this.article.author.username === this.user.username
    }
    
  },
   methods: {
     async articleDelete (article) {
        console.log( this.user )
      await deleteArticle(article.slug)
      this.article.articleDeleted = false
       this.$router.push('/')
       
    },

   async onFavorite (article) {
    article.favoriteDisabled = true
    if(article.favorited) {
      await deleteFavorite(article.slug)
      article.favorited = false
      article.favoritesCount += -1
    } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
    article.favoriteDisabled = false
  },

    async onFollow (author) {
      author.followDisabled = true 
      if(author.following) {
        await deleteFollow(author.username)
        author.following = false
      } else {
        await addFollow(author.username)
        author.following = true
      }
      author.followDisabled = false
    }
    
  }
  
}

</script>

<style>
</style>