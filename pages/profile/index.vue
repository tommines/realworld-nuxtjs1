<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button
            class="btn btn-sm btn-outline-secondary action-btn"
            :class="{ active: profile.following }"
            @click="onFollow(profile)"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            <span v-if ="profile.following"> unFollow </span> <span v-else>Follow</span> {{profile.username}} 
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{active: tab === 'my_articles'}"
                :to="{
                name: 'profile',
                params: {
                  profile: profile.username
                },
                query: {
                  tab: 'my_articles'
                }
                }" 
                exact
                >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"               
                :class="{active: tab === 'my_favorited'}"
                :to="{
                  name: 'profile',
                  params: {
                    profile: profile.username
                  },
                  query: {
                    tab: 'my_favorited'
                  }
                }"
                exact
                >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
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
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
                class="author"
               >
                {{article.author.username}}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: article.favorited}"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
                {{tag}}
              </li>
            </ul>
          </nuxt-link>
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{active: item === page}" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: profile.username
                  },
                  query: {
                    page: item,
                    tab
                  }
                }">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfiles, addFollow, deleteFollow } from '@/api/profile'
import { getArticles, deleteFavorite, addFavorite } from '@/api/article'

export default {
  name: 'UserProfile',
  async asyncData (context) {
    //console.log(context.params)
    const page = Number.parseInt(context.query.page || 1)
    const limit = 20
    const offset = ( page - 1 ) * limit
    const tab = context.query.tab || 'my_articles' 
    const { username } = context.params

    const getArticle = tab === 'my_articles'
    ? { author: username }
    : { favorited: true }

    const [profiles, articlesp] = await Promise.all([
      getProfiles(username), getArticles(getArticle)
    ])
    const { profile } = profiles.data
    const { articles, articlesCount } = articlesp.data
    articles.forEach(article => article.favoriteDisabled = false)

    return {
      tab,
      limit,
      page,
      profile,
      articles,
      articlesCount,
    }
  },
  watchQuery: ['tab', 'page'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
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

<style scoped>

</style>
