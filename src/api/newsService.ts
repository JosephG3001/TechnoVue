import NewsEntity from '@/classes/newsEntity';
import { AppState } from '@/store/appstate';
import { showErrorToast } from '@/tools/toast';
import { ActionContext } from 'vuex';

const baseApi = "https://news.technolibrary.co.uk/api"
//const baseApi = "http://localhost:4002/api"

export function loadNewsFromApi(context: ActionContext<AppState, AppState>)  {
    context.commit("loadingNews");
    fetch(`${baseApi}/News?page=1&showcount=100`).then(result => result.json())
    .then((result: NewsEntity[]) => { 
      result.forEach(section => section.visible = false);
      context.commit("loadedNews", result);
    }).catch((error: string) => {
      showErrorToast(error);
      context.commit("loadNewsFailed");
    });
  }