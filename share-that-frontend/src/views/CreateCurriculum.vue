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
        <div class="text-right">
          <v-btn text-right class="mr-3">Save</v-btn>
          <v-btn text-right href="/">Cancel</v-btn>
        </div>
      </v-row>

      <v-form
      ref="form"
      v-model="valid"
      lazy-validation>
        <v-text-field
          v-model="curName"
          label="Curriculum Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="curGoal"
          label="Curriculum Goal"
          required
        ></v-text-field>

        <v-textarea
          filled outlined auto-grow
          v-model="curDescription"
          label="Description of curriculum:"
          requried
        ></v-textarea>

        <v-card
          outlined
          class="resourceSectionCard"
          >
          <v-card-title>Section</v-card-title>
          <v-list-item three-line>
            <v-text-field
              v-model="secName"
              label="Section Name"
              required
            ></v-text-field>
          </v-list-item>
          <v-list-item three-line>
            <v-text-field
              v-model="secTopic"
              label="Section Topic"
              required
            ></v-text-field>
          </v-list-item>

          <v-divider></v-divider>

          <v-card
          class="nestedResourceSectionCard">
            <v-list-item three-line>
              <v-text-field
                v-model="secResource"
                label="Resource Links"
                required
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-card-text>
                <p>list of resources</p>
              </v-card-text>
            </v-list-item>
          </v-card>
          <v-btn text-right class="mt-1 ml-5 mb-5">Add Project</v-btn>
        </v-card>
        <v-btn text-right class="mt-5 mb-5">Add Section</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateCurriculum'
}
</script>
