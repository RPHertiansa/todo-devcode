<template>
    <div class="container">
        <Header />
        <Card />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Card from '../components/Card'
import Footer from '../components/Footer'

export default {
  name: 'Foods',
  components: {
    Header,
    Card,
    Footer
  },
  created () {
    window.addEventListener('beforeunload', this.reloadPage)
  },
  methods: {
    reloadPage () {
      sessionStorage.clear()
    }
  }
}
</script>
