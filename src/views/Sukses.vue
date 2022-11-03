<template>
    <div class="container">
        <Header />
        <div class="text-center">
            <img class="img-fluid" src="../assets/images/menunggu.png" alt="" style="height: 350px">
            <h3>Sukses</h3>
            <p>Pesanan anda segera diproses</p>
            <p>Selamat menunggu</p>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'Sukses',
  components: {
    Header,
    Footer
  }
}
</script>
