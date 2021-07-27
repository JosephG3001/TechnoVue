import Section from '@/classes/section';
import { AppState } from '@/store/appstate';
import { showErrorToast } from '@/tools/toast';
import { ActionContext } from 'vuex';
import ArticleEntity from '@/classes/articleEntity';

const baseUrl = "https://content.technolibrary.co.uk/api";
//const baseUrl = "http://localhost:4001/api";

export function loadSectionsFromApi(context: ActionContext<AppState, AppState>) {
    context.commit("loadingSections");
    fetch(`${baseUrl}/Section`).then(result => result.json())
    .then((result: Section[]) => { 
      result.forEach(section => section.visible = false);
      context.commit("loadedSections", result);
    }).catch((error: string) => {
      showErrorToast(error);
      context.commit("loadSectionsFailed");
    });
  }

  export function loadArticlesFromApi(context: ActionContext<AppState, AppState>, id: string) {
    context.commit("loadingArticles");

    fetch(`${baseUrl}/articles?sectionid=${id}`).then(result => result.json())
    .then((result: ArticleEntity[]) => {       
      context.commit("loadedArticles", result);
    }).catch((error: string) => {
      showErrorToast(error);
      context.commit("loadArticlesFailed");
    });
  }

  export function loadArticleFromApi(id: string): Promise<ArticleEntity | null> {
    return fetch(`${baseUrl}/articles?id=${id}`).then(result => result.json())
    .then((result: ArticleEntity) => {
      return result;
    }).catch((error: string) => {
       showErrorToast(error); 
       return null;    
    });
  }