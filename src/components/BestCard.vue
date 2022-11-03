<template>
    <div>
        <div class="row justify-content-center align-content-center">
            <div class="col-lg-4 col-md-5  mb-4 " v-for="(product, index) in bestProducts.data" :key="index">
              <div class="card">
                <img :src="require(`../assets/images/${product.gambar}`)" class="card-img-top" alt="...">
                <div class="card-body text-left">
                  <h5 class="card-title">{{product.nama}}</h5>
                  <p class="card-text">Harga Rp {{formatPrice(product.harga)}}</p>
                  <button type="button" class="btn linov-btn" @click="addToCart(product)"><b-icon-cart class="mr-2 h5 cart-icon" ></b-icon-cart>Pesan</button>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import currency from '../mixins/currency'

export default {
  name: 'BestCard',
  mixins: [currency],
  computed: {
    ...mapGetters({
      bestProducts: 'products/getBestProducts'
    })
  },
  methods: {
    ...mapActions({
      getBestProducts: 'products/getBestProducts'
    }),
    addToCart (product) {
      this.$router.push({
        path: '/order',
        query: {
          id: product.id
        }
      })
    }
  },
  mounted () {
    this.getBestProducts()
  }
}
</script>
