<template>
    <div class="header">
        <div class="links">
            <router-link to="/">
                <i class="top-nav-menu-item-icon material-icons">home</i>
                <span>Home</span>
            </router-link>
            <a href="https://github.com/JosephG3001" target="_blank">
                <i class="fab fa-github top-nav-menu-item-icon"></i>
                <span>Github</span>
            </a>
            <a href="https://uk.linkedin.com/pub/joseph-gaisford/74/b98/661" target="_blank">
                <i class="fab fa-linkedin top-nav-menu-item-icon"></i>
                <span>LinkedIn</span>
            </a>
            <a href="https://www.technolibrary.co.uk/" >
                <i _ngcontent-c2="" class="fab fa-react"></i>
                <span>React Site</span>
            </a>
            <a href=" https://angular.technolibrary.co.uk/" >
                <i class="fab fa-angular top-nav-menu-item-icon"></i>
                <span>Angular Site</span>
            </a>
            <a href="https://classic.technolibrary.co.uk/" >
                <i class="top-nav-menu-item-icon material-icons">language</i>
                <span>Classic MVC Site</span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Header extends Vue {

}
</script>