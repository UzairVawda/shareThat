<template>
  <v-app id="app">
    <v-content>
      <TopNav />
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="snackBar.show"
      :top="true"
      :right="true"
      :timeout="6000"
      shaped
      :multi-line="true"
      :color="snackBar.varient"
    >
      {{ snackBar.message }}
        <v-btn
          dark
          text
          @click="updateSnackBar({show: false})"
        >
            Close
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TopNav from '@/components/TopNav.vue'

export default {
  name: 'App',
  components: {
    TopNav
  },
  data: () => ({

  }),
  computed: {
    ...mapState(['snackBar'])
  },
  methods: {
    ...mapMutations(['updateSnackBar'])
  }
}
</script>
