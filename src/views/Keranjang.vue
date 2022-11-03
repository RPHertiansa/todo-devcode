<template>
    <div class="container">
        <Header />
        <h2 class="text-left mt-3 mb-4">Keranjang Saya</h2>
        <div v-if="cartData.data.length === 0" class="empty">
          Silakan order terlebih dahulu
        </div>
        <div v-else>
          <table class="table text-left table-responsive-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Foto</th>
                    <th>Makanan</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in cartData.data" :key="index" >
                <tr>
                    <td>{{item.id}}</td>
                    <td><img class="img-table rounded" :src="require(`../assets/images/${item.product.gambar}`)" alt=""></td>
                    <td scope="row">{{item.product.nama}}</td>
                    <td>Rp {{formatPrice(item.product.harga)}}</td>
                    <td>{{item.jumlah_pemesanan }}</td>
                    <td>Rp {{formatPrice(item.total)}}</td>
                    <td><button @click="deleteCart(item.id)" class="btn btn-light"><b-icon-trash class="text-danger"></b-icon-trash></button></td>
                </tr>
            </tbody>
        </table>
          <div class="ml-auto col-lg-6 col-sm-12 text-left">
            <h5 class="text-left mb-4 font-weight-bold">Total Harga: <span class="ml-3">Rp {{formatPrice(total_biaya)}}</span></h5>
            <form @submit.prevent="checkout(nama, noMeja, cartData.data)">
                <div class="form-group ">
                    <label for="nama" >Nama</label>
                    <input type="text" v-model="nama" class="form-control" required>
                </div>
                <div class="form-group ">
                    <label for="nomor" >Nomor Meja</label>
                    <input type="number" v-model="noMeja" class="form-control" required>
                </div>
                <div class="text-right">
                  <button type="submit" class="btn linov-btn" ><b-icon-cart class="mr-2 h5 cart-icon" ></b-icon-cart>Pesan</button>
                </div>
            </form>
          </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import currency from '../mixins/currency'
import total from '../mixins/total'
import Swal from 'sweetalert2'

export default {
  name: 'Keranjang',
  mixins: [currency, total],
  data () {
    return {
      nama: '',
      noMeja: '',
      total_biaya: ''
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters({
      cartData: 'products/getCart',
      checkoutData: 'products/checkoutItem'
    })
  },
  created () {
    window.addEventListener('beforeunload', this.reloadPage)
  },
  methods: {
    ...mapActions({
      getCart: 'products/getCart',
      checkoutItem: 'products/checkoutItem',
      actionDeleteCart: 'products/deleteCart'
    }),
    sumTotal (harga) {
      const mapping = harga.map((e) => {
        return e.total
      })

      const total = mapping.reduce((item, data) => {
        return item + data
      }, 0)
      this.total_biaya = total
    },
    deleteCart (id) {
      this.actionDeleteCart(id)
        .then(() => {
          this.getCart()
            .then(() => {
              this.sumTotal(this.cartData.data)
            })
          Swal.fire({
            icon: 'success',
            title: 'Product is deleted'
          })
        })
    },
    checkout (nama, noMeja, keranjangs) {
      this.nama = nama
      this.noMeja = noMeja
      const totalBiaya = this.total_biaya
      const data = { nama, noMeja, keranjangs, totalBiaya }
      this.checkoutItem(data)
        .then(() => {
          keranjangs.map((e) => {
            this.actionDeleteCart(e.id)
          })
          Swal.fire({
            icon: 'success',
            title: 'Order Success!'
          })
          this.$router.push('/pesanan-sukses')
        })
    },
    reloadPage () {
      sessionStorage.clear()
    }
  },
  mounted () {
    this.getCart()
      .then(() => {
        this.sumTotal(this.cartData.data)
      })
  }
}
</script>
<style>
@import '../assets/css/main.css';
</style>
