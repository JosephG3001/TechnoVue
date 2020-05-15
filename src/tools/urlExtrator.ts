import ArticleEntity from '@/classes/articleEntity';
import Section from '@/classes/section';
import store from '@/store';

export interface TechAndSection {
    tech: Section;
    section: Section;
}

export function getTechFromURL(): Section | null {
    const params = window.location.href.split('/');
    const techName = decodeURIComponent(params[4]);
    const section = store.state.sectionsState.items.find(s => s.sectionName === techName);
    if (!section){
        return null;
    }
    return section;    
}

export function getSubSectionFromURL(): Section | null {
    const parent = getTechFromURL();
    const params = window.location.href.split('/');
    const subsectionName = decodeURIComponent(params[5]);
    const section = parent?.inverseParentSection.find(s => s.sectionName === subsectionName && s.parentSectionName === parent.sectionName);
    if (!section) {
        return null;
    }
    return section;    
}

export function getArticleFromUrl(): ArticleEntity | null {
    const params = window.location.href.split('/');
    const articleName = decodeURIComponent(params[7]);
    const article = store.state.articlesState.items.find(s => s.articleName === articleName);
    if (!article) {
        return null;
    }
    return article;
}

export function getTechFromPath(path: string): Section | null {
    const params = path.split('/');
    const techName = decodeURIComponent(params[2]);
    const section = store.state.sectionsState.items.find(s => s.sectionName === techName);
    if (!section){
        return null;
    }
    return section; 
}

export function getSubSectionFromPath(path: string): Section | null {
    const parent = getTechFromPath(path);
    const params = path.split('/');
    const subsectionName = decodeURIComponent(params[3]);
    const section = parent?.inverseParentSection.find(s => s.sectionName === subsectionName && s.parentSectionName === parent.sectionName);
    if (!section) {
        return null;
    }
    return section;   
}

export function dispatchLoadArticles(sectionId: string | undefined) {
    if (sectionId) {        
        store.dispatch({ type: 'loadArticles', sectionId: sectionId });
    }
}

export function getTechAndSubsection() {
    const tech = getTechFromURL();
    const subSection = getSubSectionFromURL();        
    if (tech && subSection)  {
        store.commit("setCurrentTech", tech);
        store.commit("setCurrentSubSection", subSection); 
        dispatchLoadArticles(subSection.sectionId);
    }    
}