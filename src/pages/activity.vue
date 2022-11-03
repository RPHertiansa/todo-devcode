<template>
  <div>
    <Header></Header>
    <b-row class="px-5 mx-5" align-v="center">
      <b-col col-6>
        <b-row>
          <h3>
            <b-icon-chevron-left type="button" @click="goBack"></b-icon-chevron-left>
          </h3>
          <div v-if="!isEdit">
            <h3 class="font-weight-bold text-capitalize">{{ activityData.title }}
              <b-icon-pencil type="button" @click="doEdit"></b-icon-pencil>
            </h3>
          </div>
          <h3 v-else>
            <b-row>
              <b-col>
                <b-form-input
                  id="input-1"
                  v-model="newTitle"
                  required
                ></b-form-input>
              </b-col>
              <b-col>
                <b-icon-pencil type="button" @click="submitEdit"></b-icon-pencil>
              </b-col>

            </b-row>
          </h3>

        </b-row>
      </b-col>
      <b-col col-6 class="text-right">
        <b-button class="ml-auto" pill variant="primary" @click="showModalAdd">Tambah</b-button>
      </b-col>
    </b-row>
    <div data-cy=”item-list-empty-state” v-if="activityData.todo_items.length === 0">
      <b-row class="px-5 mx-5" align-v="center">
        <b-col class="text-center">
          <img src="../assets/images/todo-empty-state.png" height="400" alt="">
        </b-col>
      </b-row>
    </div>
    <div data-cy=”item-list” v-else>
      <b-row class="px-5 mx-5" align-v="center">
        <b-card
          style="max-width: 20rem;"
          class="mb-2 mr-2"
        >
          <b-row align-v="center">
            <h3 class="ml-2 font-weight-bold">Title</h3>
            <b-col cols="10">
              <h6 class="text-muted">
                1 November 2010
              </h6>
            </b-col>

            <b-col cols="2">
              <b-icon-trash class="text-muted"></b-icon-trash>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <b-modal
        no-close-on-backdrop
        hide-footer
        hide-header
        hide-backdrop
        data-cy=”tambah-list-item-active”
        id="modalAdd"
        ref="modalAdd"
      >
        <p class="my-4">Hello from modal!</p>
        <b-button class="ml-auto" pill variant="light" @click="$bvModal.hide('modalDelete')">
          Batal
        </b-button>
        <b-button class="ml-auto" pill variant="danger" @click="deleteActivity()">
          Hapus
        </b-button>

      </b-modal>

    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  name: 'activity',
  components: {
    Header
  },
  data () {
    return {
      isEdit: false,
      newTitle: ''
    }
  },
  computed: {
    activityData () {
      return this.$store.getters['activity/getActivityDetail']
    }
  },
  async mounted () {
    await this.getDetail()
    this.newTitle = this.activityData.title
  },
  methods: {
    getDetail () {
      const id = this.$route.params.id
      this.$store.dispatch('activity/getDetailActivity', id)
    },
    goBack () {
      this.$router.back()
    },
    doEdit () {
      this.isEdit = true
      this.newTitle = this.activityData.title
    },
    submitEdit () {
      this.isEdit = false
      const id = this.$route.params.id
      this.$store.dispatch('activity/updateTitle', {
        id,
        newTitle: this.newTitle
      })
    },
    showModalAdd () {
      this.$bvModal.show('modalAdd')
    }
  }
}
</script>

<style scoped>

</style>
