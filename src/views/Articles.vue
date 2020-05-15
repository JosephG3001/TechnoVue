<template>
    <div class="home">
        <div class="articles" v-if="currentTech && currentSubSection">
            <div class="article-header">
                <h1>{{ currentTech.sectionName }}</h1>
                <h2>{{ currentSubSection.sectionName }}</h2>
            </div>
            <router-link v-for="article in articles" :key="article.articleId"
                        :to="{ path: getPathForArticle(article) }" class="article-list-item">
                <div class="material-icons">insert_drive_file</div>
                <h3>{{ article.articleName }}</h3>
                <div>{{ new Date(article.articleDate).toDateString() }}</div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store'
import { EModuleState } from '../store/appstate';
import Article from './Article.vue';
import ArticleEntity from '../classes/articleEntity';
import Section from '@/classes/section';
import { getTechFromURL, getSubSectionFromURL, getSubSectionFromPath, getTechFromPath, dispatchLoadArticles, getTechAndSubsection } from '@/tools/urlExtrator';

function getTechAndSubSectionAndDispatchArticleListLoad(path: string) {
    const tech = getTechFromPath(path);
    const subSection = getSubSectionFromPath(path);
    if (tech && subSection)  {
        store.commit("setCurrentTech", tech);
        store.commit("setCurrentSubSection", subSection); 
        dispatchLoadArticles(subSection.sectionId);
    }    
}

@Component({
    beforeRouteUpdate(to, from, next) {
        getTechAndSubSectionAndDispatchArticleListLoad(to.fullPath);        
        next();
    },    
    beforeRouteEnter(to, from, next) {          
        getTechAndSubSectionAndDispatchArticleListLoad(to.fullPath);   
        next();
    },
    beforeRouteLeave(to, from, next) {
        store.commit({ type: 'loadArticlesIdle' });
        next();
    }
})
export default class Articles extends Vue {
    
    get articles() { return store.state.articlesState.items; }
    get sectionsLoaded() { return store.state.sectionsState.state === EModuleState.LOADED; }
    get currentTech() { return store.state.articlesState.CurrentTech; }
    get currentSubSection() { return store.state.articlesState.CurrentSubSection; }



    @Watch("sectionsLoaded")
    techChanged() {
        getTechAndSubsection();
    }

    getPathForArticle(article: ArticleEntity) {        
        return `/articles/${encodeURIComponent(this.currentTech!.sectionName)}/${encodeURIComponent(this.currentSubSection!.sectionName)}/article/${article.articleName}`;
    }

    mounted() {        
        if (store.state.sectionsState.state === EModuleState.IDLE) {
            getTechAndSubsection();
        }        
    }    
}

</script>