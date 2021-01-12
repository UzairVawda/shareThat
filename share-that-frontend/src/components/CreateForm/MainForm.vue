<template>
  <v-form
    ref="newCurriculumForm"
    lazy-validation
  >
    <v-text-field
      v-model="currInfo.name"
      label="Curriculum Name"
      :counter="50"
      :rules="nameRules"
    ></v-text-field>

    <v-text-field
      v-model="currInfo.goal"
      label="Curriculum Goal"
      :counter="50"
      :rules="nameRules"
      class="mb-5"
    ></v-text-field>

    <v-textarea
      filled
      outlined
      auto-grow
      v-model="currInfo.description"
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
          class="ml-1"
        >
        <v-card-title>Section #{{sectionIndex + 1}}</v-card-title>
        <v-spacer></v-spacer>
        <v-icon
          class="mr-6"
          @click="deleteSection(sectionIndex)"
        >mdi-close</v-icon>
        </v-row>
      </div>

      <v-list-item>
        <v-text-field
          label="Section Name"
          v-model="section.name"
          :rules="nameRules"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          label="Section Goal"
          v-model="section.goal"
          :rules="goalRules"
        ></v-text-field>
      </v-list-item>

      <v-divider></v-divider>

      <v-card
        class="nestedSectionCard"
      >
        <v-list-item>
          <v-text-field
            label="Resource Name"
            v-model="section.newResource.name"
            :rules="nameRules"
            class="mr-1"
          ></v-text-field>
          <v-text-field
            label="Resource Link"
            v-model="section.newResource.link"
            @keyup.enter="addItem('resource', sectionIndex)"
            class="ml-1"
            :rules="linkRules"
          ></v-text-field>
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
                    <v-list-item-title>{{ resource.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ resource.link }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      color="gray lighten-1"
                      @click="deleteItem('resources', sectionIndex, resourceIndex)"
                    >mdi-close</v-icon>
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
        class="nestedSectionCard"
      >
        <v-list-item>
          <v-text-field
            label="Project Name"
            v-model="section.newProject.name"
            class="mr-1"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="Project Link"
            v-model="section.newProject.link"
            @keyup.enter="addItem('project', sectionIndex)"
            class="ml-1"
            :rules="linkRules"
          ></v-text-field>
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
                    <v-list-item-title>{{ project.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ project.link }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      @click="deleteItem('projects', sectionIndex, projectIndex)"
                    >mdi-close</v-icon>
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
    <v-row
      no-gutters
      align="center"
      justify="center"
      class="ml-2 mr-2 mb-5 pt-3"
    >
      <v-btn
        text-right
        @click="addSection"
      >Add Section</v-btn>
      <v-divider
        vertical
      ></v-divider>
      <v-btn
        text-right
        class="ml-2 mr-2"
        @click="saveCurriculum"
      >Save</v-btn>
      <v-btn
        text-right
        href="/"
      >Cancel</v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    currInfo: Object,
    nameRules: Array,
    goalRules: Array,
    linkRules: Array,
    sections: Array,
    addItem: Function,
    addSection: Function,
    deleteSection: Function
  }
}
</script>
