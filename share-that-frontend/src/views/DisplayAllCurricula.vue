<template>

  <v-row no-gutters class="displayAllCurricula">
    <v-col
    cols="12"
    md="6"
    offset-md="3"
    sm="8"
    offset-sm="2">

      <v-row no-gutters class="page-header">
        <h1>All Curricula</h1>
        <v-spacer></v-spacer>
        <v-btn text-right href="/curriculum/create">Create New</v-btn>
      </v-row>

      <div class="curriculaList">
        <v-card
          outlined
          v-for="curriculum in curricula"
          :key="curriculum._id"
          class="mb-5">
          <router-link :to="`/curricula/${curriculum._id}`">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  {{curriculum.goal}}
                </div>
                <v-list-item-title class="headline">
                  {{curriculum.name}}
                  <v-icon large>
                    mdi-chevron-double-right
                  </v-icon>
                </v-list-item-title>
                <v-list-item-subtitle>{{curriculum.description}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DisplayAllCurricula',
  data () {
    return { }
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['getCurricula'])
  },
  mounted () {
    this.getCurricula()
  }
}
</script>
