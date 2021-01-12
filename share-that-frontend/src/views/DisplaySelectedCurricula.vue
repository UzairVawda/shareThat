<template>
  <v-row no-gutters class="displaySelectedCurricula">

    <v-col
    cols="12"
    md="6"
    offset-md="3"
    sm="8"
    offset-sm="2">

      <v-row>
        <v-col>
          <h1 class="icon-container">
             {{selectedCurriculumData.name}}
             <v-icon class="editable-icon ml-3" @click="editCurriculum('description')"> mdi-pencil-box-outline </v-icon>
          </h1>
          <p class="icon-container">
            {{selectedCurriculumData.description}}
            <v-icon class="editable-icon ml-3" @click="editCurriculum('description')"> mdi-pencil-box-outline </v-icon>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-expansion-panels
        multiple
        focusable
        popout>
          <v-expansion-panel
          v-for="(section, index) in selectedCurriculumData.sections"
          :key="index">
            <v-expansion-panel-header>
              Section {{ index + 1}} - {{section.name}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list
                subheader
                three-line>
                <v-subheader class="displayCurriculaProjectHeader">Projects</v-subheader>

                <v-list-item-group
                  multiple
                  active-class="">
                  <v-list-item
                  v-for="(resource, j) in section.resources"
                  :key="resource.name + j"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active"></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{ resource.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ resource.link }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                </v-list-item-group>
              </v-list>

              <v-divider inset></v-divider>

              <v-list
                flat
                subheader
                three-line>
                <v-subheader class="displayCurriculaProjectHeader">Resources</v-subheader>

                <v-list-item-group
                  multiple
                  active-class="">
                  <v-list-item
                  v-for="(project, k) in section.projects"
                  :key="project.name + k">
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active"></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{ project.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ project.link }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

      <v-row>
        <v-col>
          <v-btn class="mt-3 ml-1" text-right href="/curricula">See All</v-btn>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DisplaySelectedCurricula',
  data () {
    return {
      selectedCurriculumData: {}
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  mounted () {
    this.selectedCurriculumData = this.curricula.find((curriculum) => {
      return curriculum._id === this.$route.params.id
    })
  }

}
</script>
