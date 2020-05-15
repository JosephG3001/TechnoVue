<template>
  <div class="home">
    <div class="home-content">
      <div class="home-title">
        <h1 class="home-title-main">
          Technolibary Vue Version
        </h1>
        <h2 class="home-title-sub">
          Programming CMS
        </h2>
      </div>        
      <div class="news-item" v-for="newsItem in news" :key="newsItem.newsId">      
        <div class="news-header">
          <div class="news-title">
            {{ newsItem.title }}
          </div>
          <div class="news-date">
            {{ new Date(newsItem.createdDate).toDateString() }}
          </div>
        </div>      
        <div>
          {{ newsItem.html }}
        </div>
      </div>
      <br >
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
import store from '@/store'
import { EModuleState } from '../store/appstate';

@Component
export default class Home extends Vue {
  
  get news() {
    return store.state.newsState.items;
  }

  mounted() {  
    if (store.state.newsState.state === EModuleState.IDLE) {
      store.dispatch({ type: 'loadNews' });
    }
  }
}
</script>
