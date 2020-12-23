<template>
  <v-row no-gutters class="createCurriculumContainer">

    <v-col
    cols="12"
    md="6"
    offset-md="3"
    sm="8"
    offset-sm="2">

      <v-row no-gutters class="page-header">
        <h1>Create Curriculum</h1>
        <v-spacer></v-spacer>
        <v-btn
          text-right
          class="mr-3"
          @click="saveCurriculum "
        >Save</v-btn>
        <v-btn text-right href="/">Cancel</v-btn>
      </v-row>

      <v-form
        ref="form"
        lazy-validation>
        <v-text-field
          v-model="name"
          label="Curriculum Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="goal"
          label="Curriculum Goal"
          required
        ></v-text-field>

        <v-textarea
          filled outlined auto-grow
          v-model="description"
          label="Description of curriculum:"
          requried
        ></v-textarea>

        <v-card
          outlined
          class="resourceSectionCard"
          v-for="(section, sectionIndex) in sections"
          :key="sectionIndex"
        >
          <div>
            <v-row
              class="ml-1">
              <v-card-title>Section #{{sectionIndex + 1}}</v-card-title>
              <v-spacer></v-spacer>
              <v-icon  class="mr-6" @click="deleteSection(sectionIndex)">mdi-close</v-icon>
            </v-row>
          </div>
          <v-list-item>
            <v-text-field
              label="Section Name"
              required
              v-model="section.name"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              label="Section Goal"
              required
              v-model="section.goal"
            ></v-text-field>
          </v-list-item>

          <v-divider></v-divider>

          <v-card
            class="nestedSectionCard">
            <v-list-item>
              <v-text-field
                label="Resource Links"
                required
                v-model="section.newResource"
                @keyup.enter="addItem('resource', sectionIndex)"
              >
              </v-text-field>
              <v-btn
                text-right
                small
                class="mt-5 mb-5 ml-5 mr-1"
                @click="addItem('resource', sectionIndex)"
                >Add Resource</v-btn>
            </v-list-item>
            <v-list-item>
              <v-card-text
                v-if="section.resources.length"
              >
                <v-card
                  class="mx-auto"
                  tile
                >
                  <template v-for="(resource, resourceIndex) in section.resources">
                    <v-list-item
                      two-line
                      :key="resource + resourceIndex"
                      class="itemFromList"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ resource }}</v-list-item-title>
                        <v-list-item-subtitle>LINK</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon color="gray lighten-1" @click="deleteItem('resources', sectionIndex, resourceIndex)">mdi-close</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="resourceIndex < section.resources.length - 1"
                      :key="resourceIndex"
                    />
                  </template>
                </v-card>
              </v-card-text>
            </v-list-item>
          </v-card>

          <v-card
            class="nestedSectionCard">
            <v-list-item>
              <v-text-field
                label="Project Links"
                required
                v-model="section.newProject"
                @keyup.enter="addItem('project', sectionIndex)"
              >
              </v-text-field>
              <v-btn
                text-right
                small
                class="mt-5 mb-5 ml-5 mr-1"
                @click="addItem('project', sectionIndex)"
                >Add Project</v-btn>
            </v-list-item>
            <v-list-item>
              <v-card-text>
                <v-card
                  class="mx-auto"
                  tile
                >
                  <template v-for="(project, projectIndex) in section.projects">
                    <v-list-item
                      two-line
                      :key="project + projectIndex"
                      class="itemFromList"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ project }}</v-list-item-title>
                        <v-list-item-subtitle>LINK</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon @click="deleteItem('projects', sectionIndex, projectIndex)">mdi-close</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="projectIndex < section.projects.length - 1"
                      :key="projectIndex"
                    />
                  </template>
                </v-card>

              </v-card-text>
            </v-list-item>
          </v-card>

        </v-card>
        <v-btn
          text-right
          class="mt-5 mb-5"
          @click="addSection"
          >Add Section
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreateCurriculum',
  data () {
    return {
      name: '',
      goal: '',
      description: '',
      sections: [{
        name: '',
        goal: '',
        newResource: '',
        resources: [],
        newProject: '',
        projects: []
      }]
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum () {
      const { name, goal, description, sections } = this
      const newSections = sections.map((section, i) => {
        const updatedSection = { ...section }
        delete updatedSection.newResource
        delete updatedSection.newProject
        return updatedSection
      })
      const curriculum = { name, goal, description, sections: newSections }
      this.postCurriculum(curriculum)
    },
    addSection () {
      this.sections.push({
        name: '',
        goal: '',
        resources: [],
        projects: []
      })
    },
    addItem (type, index) {
      const newItem = this.sections[index][`new${type[0].toUpperCase()}${type.slice(1)}`]
      this.sections[index][`${type}s`].push(newItem)
      this.sections[index][`new${type[0].toUpperCase()}${type.slice(1)}`] = ''
    },
    deleteItem (type, sectionIndex, typeIndex) {
      if (typeIndex > -1) {
        this.sections[sectionIndex][type].splice(typeIndex, 1)
      }
    },
    deleteSection (index) {
      this.sections.splice(index, 1)
    }
  }
}
</script>
