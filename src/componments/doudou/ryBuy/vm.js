
export default {
  name: 'RyBuy',
  data () {
    return {
      showShop: false,
    }
  },

  methods: {
    transShop () {
      this.showShop = !this.showShop
    },
  },
}
