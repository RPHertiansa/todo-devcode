const total = {
  data () {
    return {
      countTotal (harga) {
        const mapping = harga.map((e) => {
          return e.total
        })

        const total = mapping.reduce((item, data) => {
          return item + data
        }, 0)
        return total
      }
    }
  }
}

export default total
