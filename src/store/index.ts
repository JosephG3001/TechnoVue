import { loadArticlesFromApi, loadSectionsFromApi } from '@/api/articleService';
import { loadNewsFromApi } from '@/api/newsService';
import ArticleEntity from '@/classes/articleEntity';
import NewsEntity from '@/classes/newsEntity';
import Section from '@/classes/section';
import Vue from 'vue';
import Vuex from 'vuex';
import { AppState, defaultAppState, EModuleState } from './appstate';
import { TechAndSection } from '@/tools/urlExtrator';

Vue.use(Vuex)

export const store = new Vuex.Store<AppState>({
  state: defaultAppState,
  mutations: {
    loadingSections: function(state: AppState){
      state.sectionsState.state = EModuleState.LOADING;
    },
    loadedSections: function(state: AppState, sections: Section[]){
      state.sectionsState.items = sections;
      state.sectionsState.state = EModuleState.LOADED;
    },
    loadSectionsFailed: function(state: AppState){
      state.sectionsState.state = EModuleState.FAILED;  
    },
    loadingNews: function(state: AppState){
      state.newsState.state = EModuleState.LOADING;
    },
    loadedNews: function(state: AppState, sections: NewsEntity[]){
      state.newsState.items = sections;
      state.newsState.state = EModuleState.LOADED;
    },
    loadNewsFailed: function(state: AppState){
      state.newsState.state = EModuleState.FAILED;  
    },
    loadingArticles: function(state: AppState) {
      state.articlesState.state = EModuleState.LOADING;
    },
    loadedArticles: function(state: AppState, articles: ArticleEntity[]){
      state.articlesState.items = articles;
      state.articlesState.state = EModuleState.LOADED;
    },
    loadArticlesFailed: function(state: AppState){
      state.articlesState.state = EModuleState.FAILED;  
    },
    loadArticlesIdle: function(state: AppState){
      state.articlesState.state = EModuleState.IDLE;  
    },
    setCurrentTech: function(state: AppState, section: Section) {
      state.articlesState.CurrentTech = section;      
    },
    setCurrentSubSection: function(state: AppState, section: Section) {
      state.articlesState.CurrentSubSection = section;
    }    
  },
  actions: {
    loadSections(context) { return loadSectionsFromApi(context); },
    loadNews(context) { return loadNewsFromApi(context); },
    loadArticles(context, actionProps) { return loadArticlesFromApi(context, actionProps.sectionId); },
  },
  modules: {

  },
});

export default store;