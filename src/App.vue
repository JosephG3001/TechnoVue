<template>
  <div id="app">
    <Sidebar></Sidebar>
    <Header></Header>
    <div class="body-content">      
        <router-view/>  
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

export default Vue.extend({
  components: {
    Sidebar,
    Header,
  }
})
</script>
