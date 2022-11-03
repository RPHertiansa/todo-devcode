/* eslint-disable no-unused-vars */
import axios from 'axios'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    },
    best: {
      data: []
    },
    detail: {
      data: []
    },
    cart: {
      data: []
    },
    checkout: {
      data: []
    }
  }
}

const getters = {
  getAllProducts (state) {
    return state.all
  },
  getBestProducts (state) {
    return state.best
  },
  getDetailProduct (state) {
    return state.detail
  },
  getCart (state) {
    return state.cart
  },
  checkoutItem (state) {
    return state.checkout
  }
}

const mutations = {
  SET_ALL_DATA_PRODUCT (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_BEST_PRODUCT (state, payload) {
    state.best.data = payload
  },
  SET_DETAIL_PRODUCT (state, payload) {
    state.detail.data = payload
  },
  SET_CART_DATA (state, payload) {
    state.cart.data = payload
  },
  SET_CHECKOUT_DATA (state, payload) {
    state.checkout.data = payload
  }
}

const actions = {
  getAllProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/products')
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  getBestProducts (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/best-products')
        .then((response) => {
          resolve()
          context.commit('SET_BEST_PRODUCT', response.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  search (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/products?q=${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_DATA_PRODUCT', response.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  getDetailProduct (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/products/${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_DETAIL_PRODUCT', response.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  cart (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/keranjangs', payload)
        .then((response) => {
          resolve()
          context.commit('SET_CART_DATA', response.data)
        }).catch((err) => {
          console.log(err.message)
        })
    })
  },
  getCart (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/keranjangs')
        .then((response) => {
          resolve()
          context.commit('SET_CART_DATA', response.data)
        }).catch((err) => {
          console.log(err.message)
        })
    })
  },
  deleteCart (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:3000/keranjangs/${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_CART_DATA', response.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  checkoutItem (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/pesanans', payload)
        .then((response) => {
          resolve()
          context.commit('SET_CHECKOUT_DATA', response.data)
        }).catch((err) => {
          console.log(err.message)
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
