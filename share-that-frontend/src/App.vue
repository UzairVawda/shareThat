<template>
  <v-app>
      <TopNav />
    <v-content>
      <router-view/>
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
