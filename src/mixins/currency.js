const currency = {
  data () {
    return {
      formatPrice (value) {
        const val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
  }
}

export default currency
