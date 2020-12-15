<template>
  <v-app id="app">
    <v-content>
      <TopNav />
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import TopNav from '@/components/TopNav.vue'

export default {
  name: 'App',
  components: {
    TopNav
  },
  data: () => ({
    //
  })
}
</script>
