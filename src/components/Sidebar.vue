<template>
    <div class="sidebar">
        <div class="sidebar-header">
            Technolibrary
        </div>

        <div class="spinner-wrapper" v-if="loading">
            <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
            <label class="loading-label">
                Loading...
            </label>
        </div>        
        <div>
            <div v-for="section in sections" :key="section.sectionId">
                <SidebarItem v-bind:props="{ section: section}"></SidebarItem>
            </div>            
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from './../store'
import { EModuleState } from '@/store/appstate'
import Section from '@/classes/section';
import { slidetoggle } from '@/tools/collapse'
import SidebarItem from './SidebarItem.vue'

export default Vue.extend({
    components: {
        SidebarItem
    },
    computed: {
        sections: () => store.state.sectionsState.items,
        loading: () => store.state.sectionsState.state === EModuleState.LOADING ? true : false
    },
    methods: {
        toggleSubmenu: function($event, section: Section){            
            section.visible = !section.visible;           
            slidetoggle($event.currentTarget.nextSibling);
        },
        getArticleLink: function(section: Section) {
            return `/article/${section.parentSectionName}/${section.sectionName}`;       
        }
    },
    mounted: function() {
        if (store.state.sectionsState?.state === EModuleState.IDLE) {
            store.dispatch({ type: "loadSections" });
        }
    }
})
</script>