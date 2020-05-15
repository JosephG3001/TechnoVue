import NewsEntity from '@/classes/newsEntity';
import { AppState } from '@/store/appstate';
import { showErrorToast } from '@/tools/toast';
import { ActionContext } from 'vuex';

export function loadNewsFromApi(context: ActionContext<AppState, AppState>)  {
    context.commit("loadingNews");
    fetch("http://api.technolibrary.co.uk/api/News?page=1&showcount=100").then(result => result.json())
    .then((result: NewsEntity[]) => { 
      result.forEach(section => section.visible = false);
      context.commit("loadedNews", result);
    }).catch((error: string) => {
      showErrorToast(error);
      context.commit("loadNewsFailed");
    });
  }