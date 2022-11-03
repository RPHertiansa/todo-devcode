<template>
  <div>
    <Header></Header>
    <b-row class="px-5 mx-5" align-v="center">
      <b-col col-6>
        <h3 class="font-weight-bold text-capitalize">Activity</h3>
      </b-col>
      <b-col col-6 class="text-right">
        <b-button class="ml-auto" pill variant="primary" @click="addActivity">Tambah</b-button>
      </b-col>
    </b-row>
    <div v-if="activityList.length === 0" data-cy=”dashboard-empty-state”>
      <b-row class="px-5 mx-5" align-v="center">
        <b-col class="text-center">
          <img src="../assets/images/activity-empty-state.png" height="400" alt="">
        </b-col>
      </b-row>
    </div>

    <div v-else data-cy=”dashboard”>
      <b-row class="px-5 mx-5" align-v="center">
        <div class="col-lg-3 col-md-5  my-4 " v-for="(data, index) in activityList" :key="index">
          <b-card
            style="height: 15rem;"
            class="shadow mb-2 mr-2"
          >
            <b-row align-v="end">
              <h3 class="ml-2 font-weight-bold" type="button" @click="goToDetail(data.id)">
                {{ data.title }}</h3>
              <b-col cols="10">
                <h6 class="text-muted">
                  {{ data.created_at }}
                </h6>
              </b-col>
              <b-col cols="2">
                <b-icon-trash
                  class="text-muted" type="button"
                  @click="showModal(data)">
                </b-icon-trash>
              </b-col>
            </b-row>
          </b-card>
          <div>

          </div>
        </div>
      </b-row>
      <b-modal
        no-close-on-backdrop
        hide-footer
        hide-header
        hide-backdrop
        data-cy=”delete-activity”
        id="modalDelete"
        ref="modalDelete"
      >
        <div class="text-center">
          <h1>
            <b-icon-exclamation-triangle class="text-danger"></b-icon-exclamation-triangle>
          </h1>
          <p class="my-4">Apakah anda yakin menghapus activity <b>{{ titleDelete }}</b>?</p>
          <b-button class="ml-auto" pill variant="light" @click="$bvModal.hide('modalDelete')">
            Batal
          </b-button>
          <b-button class="ml-auto" pill variant="danger" @click="deleteActivity()">
            Hapus
          </b-button>
        </div>

      </b-modal>
      <b-modal
        hide-footer
        hide-header
        hide-backdrop
        data-cy=”alert-activity”
        id="alertActivity"
        ref="alertActivity"
      >
        <b-row align-v="center">
          <b-icon-info-circle class="mx-2 text-info"></b-icon-info-circle>
          <span>Activity Berhasil Dihapus</span>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  name: 'dashboard',
  components: {
    Header
  },
  data () {
    return {
      idDelete: '',
      titleDelete: ''
    }
  },
  computed: {
    activityList () {
      return this.$store.getters['activity/getActivityList']
    }
  },
  mounted () {
    this.getAllActivity()
  },
  methods: {
    getAllActivity () {
      this.$store.dispatch('activity/getAllActivity')
    },
    addActivity () {
      this.$store.dispatch('activity/addActivity')
    },
    deleteActivity () {
      this.$store.dispatch('activity/deleteActivity', this.idDelete)
      this.$bvModal.hide('modalDelete')
      this.$bvModal.show('alertActivity')
    },
    goToDetail (id) {
      this.$router.push(`/detail/${id}`)
    },
    showModal (data) {
      this.$bvModal.show('modalDelete')
      this.idDelete = data.id
      this.titleDelete = data.title
    }
  }
}
</script>

<style scoped>

</style>
