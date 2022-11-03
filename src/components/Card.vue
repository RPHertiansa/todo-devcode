<template>
    <div>
      <h2 class="text-left mb-4">Daftar <span><strong>Makanan</strong></span></h2>
      <div class="input-group mb-5">
        <input type="text" class="form-control" @keyup="search(query)" v-model="query" placeholder="Cari Makanan Kesukaan Anda" >
        <div class="input-group-append">
          <span class="input-group-text"><b-icon-search></b-icon-search></span>
        </div>
      </div>
      <div v-if="Products.isLoading">
        <div class="row" style="height: 45vw">
          <div class="col-lg-12 text-center">
             <div class="text-center spinner-border linov-text "  style="width: 3rem; height: 3rem;" role="status"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="Products.data.length === 0" style="height: 45vw;">
          <div class="row">
            <div class="col-lg-12 ">
              <h1 class="text-center font-weight-bold m-auto">Data not found</h1>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row justify-content-center align-content-center">
            <div class="col-lg-4 col-md-5  mb-4 " v-for="(product, index) in Products.data" :key="index">
              <div class="card">
                <img :src="require(`../assets/images/${product.gambar}`)" class="card-img-top" alt="...">
                <div class="card-body text-left">
                  <h5 class="card-title">{{product.nama}}</h5>
                  <p class="card-text">Harga Rp {{formatPrice(product.harga)}}</p>
                  <button type="button" class="btn linov-btn" @click="order(product)"><b-icon-cart class="mr-2 h5 cart-icon" ></b-icon-cart>Pesan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import currency from '../mixins/currency'

export default {
  name: 'Card',
  mixins: [currency],
  data () {
    return {
      query: '',
      id: '',
      kode: '',
      nama: '',
      harga: '',
      gambar: '',
      prodData: this.Products
    }
  },
  computed: {
    ...mapGetters({
      Products: 'products/getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      getAllProducts: 'products/getAllProducts',
      search: 'products/search'
    }),
    actionGET () {
      this.getAllProducts()
      this.createDB()
    },
    order (product) {
      localStorage.removeItem('id')
      localStorage.setItem('id', product.id)
      this.$router.push({
        path: '/order',
        query: {
          id: product.id
        }
      })
    },
    createDB () {
      let db = null

      const request = indexedDB.open('prod', 1)

      request.onupgradeneeded = e => {
        db = e.target.result
        const store = db.createObjectStore('product', { keyPath: 'id' })
        store.transaction.oncomplete = e => {
          console.log('store created')
        }
        console.log('upgrade is called')
      }

      request.onsuccess = e => {
        function insertItem (products) {
          if (db) {
            const insert = db.transaction('product', 'readwrite')
            const store = insert.objectStore('product')

            insert.onerror = e => {
              console.log('error')
            }

            store.transaction.oncomplete = e => {
              console.log('success')
            }

            products.forEach(product => {
              const request = store.add(product)

              request.onerror = e => {
                console.log('insert error')
              }

              request.onsuccess = e => {
                console.log('insert success')
              }
            })
          }
        }
        insertItem(this.Products.data)
        console.log(this.Products.data)
        console.log('success')
      }

      request.onerror = e => {
        console.log('error')
      }
    }

  },
  mounted () {
    this.actionGET()
  }
}
</script>

<style>
@import '../assets/css/main.css';
</style>
