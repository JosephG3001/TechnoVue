import Section from '@/classes/section';
import ArticleEntity from '@/classes/articleEntity';
import NewsEntity from '@/classes/newsEntity';

export enum EModuleState {
  IDLE,
  LOADING,
  LOADED,
  FAILED
}
  
export interface AppState {
  sectionsState: BaseState<Section>;
  articlesState: ArticlesState;
  newsState: BaseState<NewsEntity>;
}

interface BaseState<T> {
  state: EModuleState;
  items: Array<T>;
}

interface ArticlesState extends BaseState<ArticleEntity> {
  CurrentSubSection?: Section;
  CurrentTech?: Section;
}

export const defaultAppState: AppState = {
  articlesState: {
    state: EModuleState.IDLE,
    items: [],
    CurrentSubSection: undefined,
    CurrentTech: undefined
  },
  newsState: {
    state: EModuleState.IDLE,
    items: []
  },
  sectionsState: {
    state: EModuleState.IDLE,
    items: []
  }
}