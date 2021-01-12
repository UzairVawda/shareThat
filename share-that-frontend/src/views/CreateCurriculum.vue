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
        :currInfo="currInfo"
        :nameRules="nameRules"
        :goalRules="goalRules"
        :linkRules="linkRules"
        :sections="sections"
        :addItem="addItem"
        :addSection="addSection"
        :deleteSection="deleteSection"
        :deleteItem="deleteItem"
      />
    </v-col>
    <v-snackbar
      v-model="snackBar"
      :top="true"
      :right="true"
      :timeout="6000"
      shaped
      :multi-line="true"
    >
      {{ snackBarText }}
        <v-btn
          dark
          text
          @click="snackBar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import MainForm from '@/components/CreateForm/MainForm'

// eslint-disable-next-line
const urlRegex = /https?:[0-9]*\/\/[\w!?/\+\-_~=;\.,*&@#$%\(\)\'\[\]]+/

export default {
  name: 'CreateCurriculum',
  components: {
    MainForm
  },
  data () {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v.length >= 3) || 'Name must be more than 3 characters',
        v => (v.length <= 50) || 'Name must be less than 50 characters'
      ],
      goalRules: [
        v => !!v || 'Goal is required',
        v => (v.length >= 3) || 'Goal must be more than 3 characters',
        v => (v.length <= 50) || 'Goal must be less than 50 characters'
      ],
      linkRules: [
        v => (v.length < 1 || urlRegex.test(v)) || 'Must be valid link'
      ],
      currInfo: {
        name: '',
        goal: '',
        description: ''
      },
      sections: [{
        name: '',
        goal: '',
        newResource: {
          name: '',
          link: ''
        },
        resources: [],
        newProject: {
          name: '',
          link: ''
        },
        projects: []
      }],
      snackBarText: '',
      snackBar: false
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum () {
      if (this.$refs.newCurriculumForm.validate()) {
        const { currInfo, sections } = this
        const newSections = sections.map((section, i) => {
          const updatedSection = { ...section }
          delete updatedSection.newResource
          delete updatedSection.newProject
          return updatedSection
        })
        const curriculum = { ...currInfo, sections: newSections }
        this.postCurriculum(curriculum)
      }
    },
    addSection () {
      this.sections.push({
        name: '',
        goal: '',
        newResource: {
          name: '',
          link: ''
        },
        newProject: {
          name: '',
          link: ''
        },
        resources: [],
        projects: []
      })
    },
    addItem (type, index) {
      const key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[index][key]
      const nameCheck = (item.name.length > 0)
      const linkCheck = (item.link.length > 0) && urlRegex.test(item.link)
      if (nameCheck && linkCheck) {
        const itemObject = {
          name: item.name,
          link: item.link
        }
        this.sections[index][`${type}s`].push(itemObject)
        item.name = '   '
        item.link = ''
      } else {
        console.log(nameCheck, linkCheck)
        const nameError = !nameCheck ? 'Must provide name.' : ''
        const linkError = !linkCheck ? 'URL must be valid.' : ''
        this.snackBarText = `${nameError} ${linkError}`
        this.snackBar = true
      }
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
