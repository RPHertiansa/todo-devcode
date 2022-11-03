<template>
  <div class="container">
    <Header />
    <div class="row">
      <div class="col-lg-6 text-left mt-5">
        <h2 class="font-weight-bold">Delicious Food Menu</h2>
        <h2>In your phone</h2>
        <p>Ayo segera pilih dan pesan makanan favorit anda</p>
        <b-button class="linov-btn" to="/foods"><b-icon-arrow-right class="mr-1 arrow-icon h3"></b-icon-arrow-right> Pesan</b-button>
      </div>
      <div class="col-lg-6">
        <img class="img-fluid" src="../assets/images/ilustrasi.png" height="400px" alt="">
      </div>
    </div>
    <div class="row mb-3 mt-3">
      <div class="col-lg-6">
        <h2 class="text-left mb-3">Best <span><strong>Foods</strong></span></h2>
      </div>
      <div class="col-lg-6 ml-auto text-right">
        <b-button class="linov-btn" to="/foods"><b-icon-eye class="mr-1 arrow-icon h3"></b-icon-eye>Lihat semua</b-button>
      </div>
    </div>
    <BestCard />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import BestCard from '../components/BestCard'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    BestCard,
    Footer
  }
}
</script>
<style>
@import '../assets/css/main.css';
</style>
