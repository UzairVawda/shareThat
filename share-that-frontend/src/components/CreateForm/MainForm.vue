<template>
  <v-form
    lazy-validation
  >
    <v-text-field
      v-model="currInfo.name"
      label="Curriculum Name"
      :counter="50"
    ></v-text-field>

    <v-text-field
      v-model="currInfo.goal"
      label="Curriculum Goal"
      class="mb-5"
    ></v-text-field>

    <v-textarea
      filled
      outlined
      auto-grow
      requried
      label="Description of curriculum:"
      v-model="currInfo.description"
    ></v-textarea>

    <FormSections
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :deleteSection="deleteSection"
    />

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
        @click.prevent="submit"
      >Save</v-btn>
      <v-btn
        text-right
        href="/"
      >Cancel</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import FormSections from '@/components/CreateForm/FormSections'

export default {
  components: {
    FormSections
  },
  props: {
    saveCurriculum: Function
  },
  data () {
    return {
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
      }]
    }
  },
  methods: {
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
      const linkCheck = (item.link.length > 0)
      if (nameCheck && linkCheck) {
        const itemObject = {
          name: item.name,
          link: item.link
        }
        this.sections[index][`${type}s`].push(itemObject)
        item.name = ''
        item.link = ''
      } else {
        console.log(nameCheck, linkCheck)
        const nameError = !nameCheck ? 'Must provide name.' : ''
        const linkError = !linkCheck ? 'URL must be valid.' : ''
        const snackBarMessage = `${nameError} ${linkError}`
        this.updateSnackBar({ message: snackBarMessage, show: true, varient: 'error' })
      }
    },
    deleteItem (type, sectionIndex, typeIndex) {
      if (typeIndex > -1) {
        this.sections[sectionIndex][type].splice(typeIndex, 1)
      }
    },
    deleteSection (index) {
      this.sections.splice(index, 1)
    },
    submit () {
      console.log('HERE')
      this.saveCurriculum(this.currInfo, this.sections)
    }
  }
}
</script>
