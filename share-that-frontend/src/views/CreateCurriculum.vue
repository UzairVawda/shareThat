<template>
  <v-row no-gutters class="createCurriculumContainer">

    <v-col
      cols="12"
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <v-row no-gutters class="page-header">
        <h1>Create Curriculum</h1>
      </v-row>

      <MainForm
        :saveCurriculum="saveCurriculum"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import MainForm from '@/components/CreateForm/MainForm'

export default {
  name: 'CreateCurriculum',
  components: {
    MainForm
  },
  methods: {
    ...mapActions(['postCurriculum']),
    ...mapMutations(['updateSnackBar']),
    saveCurriculum (currInfo, sections) {
      console.log(currInfo, sections)
      const newSections = sections.map((section, i) => {
        const updatedSection = { ...section }
        delete updatedSection.newResource
        delete updatedSection.newProject
        return updatedSection
      })
      const curriculum = { ...currInfo, sections: newSections }
      this.postCurriculum(curriculum)
    }
  }
}
</script>
