/* eslint-disable no-unused-vars */
import axios from 'axios'

const state = () => {
  return {
    activityList: [],
    activity: {},
    title: ''
  }
}

const getters = {
  getActivityList: (state) => {
    return state.activityList
  },
  getActivityDetail: (state) => {
    return state.activity
  },
  getNewTitle: (state) => {
    return state.title
  }
}

const mutations = {
  setDataActivity (state, payload) {
    state.activityList = payload
  },
  setDetailActivity (state, payload) {
    state.activity = payload
  },
  setNewTitle (state, payload) {
    state.activity = payload
  }
}

const actions = {
  getAllActivity (context) {
    return new Promise((resolve, reject) => {
      axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=rphertiansa%40gmail.com')
        .then((response) => {
          resolve()
          context.commit('setDataActivity', response.data.data)
        }).catch((err) => {
          console.error(err)
        })
    })
  },
  addActivity (context) {
    return new Promise((resolve, reject) => {
      const payload = {
        title: 'New Activity',
        email: 'rphertiansa@gmail.com',
        _comment: 'email digunakan untuk membedakan list data yang digunakan antar aplikasi'
      }
      axios.post('https://todo.api.devcode.gethired.id/activity-groups', payload)
        .then((response) => {
          resolve(
            context.dispatch('getAllActivity'))
        }).catch((err) => {
          console.error(err.message)
        })
    })
  },
  deleteActivity (context, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        .then((response) => {
          resolve()
          context.dispatch('getAllActivity')
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  getDetailActivity (context, id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        .then((response) => {
          resolve()
          context.commit('setDetailActivity', response.data)
        }).catch((err) => {
          console.error(err)
        })
    })
  },
  updateTitle (context, payload) {
    const {
      id,
      newTitle
    } = payload
    console.log('test', id, newTitle)
    return new Promise((resolve, reject) => {
      axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`,
        { title: newTitle })
        .then((response) => {
          resolve()
          context.dispatch('getDetailActivity', id)
          console.log('response', response.data)
        }).catch((err) => {
          console.error(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
