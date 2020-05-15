<template>
    <div  class="home">
        <div v-if="currentArticle" class="article-wrapper">
            <div class="article-page">
                <div v-html="currentArticle.articleHtml">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store';
import { EModuleState } from '@/store/appstate';
import { loadArticleFromApi } from '@/api/articleService';
import { getArticleFromUrl, getTechAndSubsection } from '@/tools/urlExtrator';
import ArticleEntity from '../classes/articleEntity';

declare let SyntaxHighlighter: any;

@Component
export default class Article extends Vue {
    
    get articles() { return store.state.articlesState.items; }
    get sectionsLoaded() { return store.state.sectionsState.state === EModuleState.LOADED; }    
    get currentTech() { return store.state.articlesState.CurrentTech; }
    get currentSubSection() { return store.state.articlesState.CurrentSubSection; }

    currentArticle: ArticleEntity | null;

    constructor() {
        super()
        this.currentArticle = null;
    }

    @Watch("sectionsLoaded")
    onSectionsLoaded() {
        this.tryLoadArticle();
    }

    @Watch("articles")
    onArticlesChanged() {
        this.tryLoadArticle();
    }

    mounted() {
        this.tryLoadArticle();
    }
    
    tryLoadArticle() {
        if (!this.articles || this.articles.length === 0) {
            getTechAndSubsection();
        } else {
            if (this.currentTech && this.currentSubSection) {
                const article = getArticleFromUrl();
                if (article) {
                    this.currentArticle = article;
                    this.highlight();
                }            
            }
        }        
    }

    highlight() {
        let retries = 10;
        const tryHighlight = setTimeout(() => {
            SyntaxHighlighter.defaults['toolbar'] = false;
            SyntaxHighlighter.defaults['gutter'] = false;
            SyntaxHighlighter.all();  
            SyntaxHighlighter.highlight({gutter: false});            
            retries--;
            if (retries === 0) {
                clearTimeout(tryHighlight);
                return;
            }
        }, 100);
    }    
}
</script>