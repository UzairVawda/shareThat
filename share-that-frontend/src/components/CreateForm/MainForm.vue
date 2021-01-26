<template>
  <v-form
    lazy-validation
    ref="curriculumInfo"
  >
    <v-text-field
      requried
      :counter="50"
      :rules="currNameRules"
      v-model="currInfo.name"
      label="Curriculum Name"
    ></v-text-field>

    <v-text-field
      requried
      class="mb-5"
      :rules="currGoalRules"
      v-model="currInfo.goal"
      label="Curriculum Goal"
    ></v-text-field>

    <v-textarea
      filled
      outlined
      auto-grow
      requried
      :rules="currDescriptionRules"
      label="Description of curriculum:"
      v-model="currInfo.description"
    ></v-textarea>

    <FormSections
      ref="formSections"
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :deleteSection="deleteSection"
      :sectionNameRules="sectionNameRules"
      :sectionGoalRules="sectionGoalRules"
      :sectionResourceNameRules="sectionResourceNameRules"
      :sectionResourceLinkRules="sectionResourceLinkRules"
      :sectionProjectNameRules="sectionProjectNameRules"
      :sectionProjectLinkRules="sectionProjectLinkRules"
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
var pattern = '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$' // fragment locator

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
      }],
      currNameRules: [
        v => !!v || 'Name is required.',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters.',
        v => (v && v.length >= 3) || 'Name must be greater than 3 characters.'
      ],
      currGoalRules: [v => !!v || 'Goal is required'],
      currDescriptionRules: [v => !!v || 'Descriptions is required.'],
      sectionNameRules: [v => !!v || 'Section name is required.'],
      sectionGoalRules: [v => !!v || 'Section goal is required.'],
      sectionResourceNameRules: [v => !!v || 'Name is required.'],
      sectionProjectNameRules: [v => !!v || 'Name is required.'],
      sectionResourceLinkRules: [
        v => !!v || 'Link is required.',
        v => (v && v.match(pattern)) || 'Link is not valid.'
      ],
      sectionProjectLinkRules: [
        v => !!v || 'Link is required.',
        v => (v && v.match(pattern)) || 'Link is not valid.'
      ]
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
      console.log(this.$refs.formSections.$refs.sectionResourceName[0], this.$refs.formSections.$refs.sectionResourceLink[0])
      console.log(type)
      if (type === 'resource') {
        console.log('type resource')
        if (this.$refs.formSections.$refs.sectionResourceName[0].validate() && this.$refs.formSections.$refs.sectionResourceLink[0].validate()) {
          console.log('both fields are valid')
          const key = `new${type[0].toUpperCase()}${type.slice(1)}`
          const item = this.sections[index][key]
          const itemObject = {
            name: item.name,
            link: item.link
          }
          this.sections[index][`${type}s`].push(itemObject)
          item.name = ''
          item.link = ''
          console.log('resetting resources field')
          this.$refs.formSections.$refs.sectionResourceName[0].resetValidation()
          this.$refs.formSections.$refs.sectionResourceLink[0].resetValidation()
        } else {
          this.$refs.formSections.$refs.sectionResourceName[0].validate()
          this.$refs.formSections.$refs.sectionResourceLink[0].validate()
        }
      } else if (type === 'project') {
        console.log('type project')
        if (this.$refs.formSections.$refs.sectionProjectName[0].validate() && this.$refs.formSections.$refs.sectionProjectLink[0].validate()) {
          console.log('both fields are valid')
          const key = `new${type[0].toUpperCase()}${type.slice(1)}`
          const item = this.sections[index][key]
          const itemObject = {
            name: item.name,
            link: item.link
          }
          this.sections[index][`${type}s`].push(itemObject)
          item.name = ''
          item.link = ''
          console.log('resetting project field')
          this.$refs.formSections.$refs.sectionProjectName[0].resetValidation()
          this.$refs.formSections.$refs.sectionProjectLink[0].resetValidation()
        } else {
          this.$refs.formSections.$refs.sectionResourceName[0].validate()
          this.$refs.formSections.$refs.sectionResourceLink[0].validate()
        }
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
      if (this.$refs.curriculumInfo.validate()) {
        this.saveCurriculum(this.currInfo, this.sections)
      }
    }
  }
}
</script>
