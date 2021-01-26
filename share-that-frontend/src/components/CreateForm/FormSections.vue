<template>
  <div>
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
          :rules="sectionNameRules"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          label="Section Goal"
          v-model="section.goal"
          :rules="sectionGoalRules"
        ></v-text-field>
      </v-list-item>

      <v-divider></v-divider>

      <v-card
        class="nestedSectionCard pb-3"
      >
        <v-list-item>
          <v-text-field
            class="mr-1"
            label="Resource Name"
            ref="sectionResourceName"
            :rules="sectionResourceNameRules"
            v-model="section.newResource.name"
          ></v-text-field>
          <v-text-field
            class="ml-1"
            label="Resource Link"
            ref="sectionResourceLink"
            :rules="sectionResourceLinkRules"
            v-model="section.newResource.link"
            @keyup.enter="addItem('resource', sectionIndex)"
          ></v-text-field>

          <v-btn
            text-right
            small
            class="mt-5 mb-5 ml-5 mr-1"
            @click="addItem('resource', sectionIndex)"
          >Add Resource</v-btn>
        </v-list-item>
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
      </v-card>
      <v-card
        class="nestedSectionCard pb-3"
      >
        <v-list-item>
          <v-text-field
            label="Project Name"
            ref="sectionProjectName"
            :rules="sectionProjectNameRules"
            v-model="section.newProject.name"
            class="mr-1"
          ></v-text-field>
          <v-text-field
            label="Project Link"
            ref="sectionProjectLink"
            :rules="sectionProjectLinkRules"
            v-model="section.newProject.link"
            @keyup.enter="addItem('project', sectionIndex)"
            class="ml-1"
          ></v-text-field>
          <v-btn
            text-right
            small
            class="mt-5 mb-5 ml-5 mr-1"
            @click="addItem('project', sectionIndex)"
          >Add Project</v-btn>
        </v-list-item>
        <v-card-text
          v-if="section.projects.length"
        >
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
      </v-card>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    sections: Array,
    addItem: Function,
    deleteItem: Function,
    deleteSection: Function,
    sectionNameRules: Array,
    sectionGoalRules: Array,
    sectionResourceNameRules: Array,
    sectionResourceLinkRules: Array,
    sectionProjectNameRules: Array,
    sectionProjectLinkRules: Array
  }
}
</script>
