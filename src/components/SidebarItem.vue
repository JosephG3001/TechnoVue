<template>
    <div >
        <div v-if="props.section.inverseParentSection.length > 0">
            <div v-on:click="toggleSubmenu($event)" class="sidebar-button">
                <div class="sidebar-button-nolink">
                    {{ props.section.sectionName }}
                </div>
            </div>                                           
            <div class="collapse sidebar-collapse" style="height: 0">
                <div v-for="subSection in props.section.inverseParentSection" 
                     :key="subSection.sectionId" 
                     class="sidebar-button">
                    <SidebarItem v-bind:props="{ section: subSection}"></SidebarItem>                    
                </div>               
            </div>                             
        </div>
        <div v-if="props.section.inverseParentSection.length === 0">
            <router-link :to="{ path: getArticleLink() }">
                <i class="material-icons section-icon">data_usage</i>
                <span>{{ props.section.sectionName }}</span>
            </router-link>                    
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from '@/store'
import Section from '../classes/section'
import { slidetoggle } from '@/tools/collapse';
import { Prop, Component } from 'vue-property-decorator';

interface SidebarItemProps {
    section: Section;
}

@Component
export default class SidebarItem extends Vue {

    @Prop({required: true})
    public props!: SidebarItemProps;

    public getArticleLink() {      
        return `/articles/${encodeURIComponent(this.props.section.parentSectionName)}/${encodeURIComponent(this.props.section.sectionName)}`;
    }

    public toggleSubmenu($event) {
        this.props.section.visible = !this.props.section.visible;
        slidetoggle($event.currentTarget.nextSibling);
    }
}
</script>